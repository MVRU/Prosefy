import { PedidoRepository } from "./Pedido.repository.js";
import { Pedido } from "./Pedido.js";
import { ObjectId } from "mongodb";
import { UsuarioRepository } from "../Usuario/Usuario.repository.js";
import { LibroRepository } from "../Libro/Libro.repository.js";
const repository = new PedidoRepository();
const usuarioRepository = new UsuarioRepository;
const libroRepository = new LibroRepository;
async function sanitizeInput(req, res, next) {
    try {
        const requiredKeys = ['fecha', 'usuario', 'libro'];
        req.body.sanitizedInput = {};
        for (const key of requiredKeys) {
            if (req.body[key] === undefined) {
                return res.status(400).send({ message: `Campo '${key}' es requerido.` });
            }
            req.body.sanitizedInput[key] = req.body[key];
        }
        next();
    }
    catch (error) {
        console.error("Error en sanitizeInput:", error);
        res.status(500).send({ message: "Error interno del servidor." });
    }
}
async function findAll(req, res) {
    try {
        const data = await repository.findAll();
        res.json({ data });
    }
    catch (error) {
        console.error("Error en findAll:", error);
        res.status(500).send({ message: "Error interno del servidor." });
    }
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const pedido = await repository.findOne({ id });
        if (!pedido) {
            return res.status(404).send({ message: "Reseña no encontrada." });
        }
        return res.json({ data: pedido });
    }
    catch (error) {
        console.error("Error en findOne:", error);
        res.status(500).send({ message: "Error interno del servidor." });
    }
}
async function add(req, res) {
    try {
        const input = req.body.sanitizedInput;
        if (!Array.isArray(input.libro)) {
            return res.status(400).send({ message: "El campo 'libro' debe ser un array." });
        }
        const usuarioId = new ObjectId(input.usuario);
        const libroIds = input.libro.map((libroId) => {
            try {
                return new ObjectId(libroId);
            }
            catch (error) {
                throw new Error(`ID de libro no válido: ${libroId}`);
            }
        });
        const pedidoInput = new Pedido(input.fecha, usuarioId, libroIds);
        const pedido = await repository.add(pedidoInput);
        res.status(201).send({ message: 'Pedido agregado con éxito.', data: pedido });
    }
    catch (error) {
        console.error("Error en add:", error);
        res.status(400).send({ message: 'Error' });
    }
}
async function update(req, res) {
    try {
        const pedidoId = req.params.id;
        const updatedData = req.body.sanitizedInput;
        const pedidoExiste = await repository.findOne({ id: pedidoId });
        if (!pedidoExiste) {
            const objectIdpedidoId = new ObjectId(pedidoId);
            const pedidoInput = new Pedido(updatedData.fecha, updatedData.usuario, updatedData.libro, objectIdpedidoId);
            const nuevopedido = await repository.add(pedidoInput);
            if (!nuevopedido) {
                return res.status(500).send({ message: "Error al crear la nueva reseña." });
            }
            return res.status(201).send({ message: 'Reseña creada con éxito.', data: nuevopedido });
        }
        const updatedpedido = await repository.update(pedidoId, updatedData);
        if (!updatedpedido) {
            return res.status(500).send({ message: "Error al actualizar la Reseña" });
        }
        return res.status(200).send({ message: 'Reseña actualizada con éxito.', data: updatedpedido });
    }
    catch (error) {
        console.error("Error en update:", error);
        res.status(500).send({ message: "Error interno del servidor." });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const pedido = await repository.delete({ id });
        if (!pedido) {
            res.status(404).send({ message: "Reseña no encontrada." });
        }
        res.status(204).send({ message: 'Reseña eliminada con éxito.' });
    }
    catch (error) {
        console.error("Error en remove:", error);
        res.status(500).send({ message: "Error interno del servidor." });
    }
}
async function findByUsuario(req, res) {
    try {
        const usuarioId = req.params.usuarioId;
        const pedidos = await repository.findByUsuario(usuarioId);
        if (!pedidos || pedidos.length === 0) {
            return res.status(404).send({ message: "No se encontraron reseñas para el Usuario proporcionado." });
        }
        res.status(200).send({ message: 'Reseñas encontradas con éxito.', data: pedidos });
    }
    catch (error) {
        console.error("Error en findByUsuario:", error);
        res.status(500).send({ message: "Error interno del servidor." });
    }
}
async function findByLibro(req, res) {
    try {
        const libroId = req.params.libroId;
        const pedidos = await repository.findByLibro(libroId);
        if (!pedidos || pedidos.length === 0) {
            return res.status(404).send({ message: "No se encontraron reseñas para el Libro proporcionado." });
        }
        res.status(200).send({ message: 'Reseñas encontradas con éxito.', data: pedidos });
    }
    catch (error) {
        console.error("Error en findByLibro:", error);
        res.status(500).send({ message: "Error interno del servidor." });
    }
}
async function getpedidos(req, res) {
    try {
        const pedidos = await repository.findAll();
        const pedidosIds = pedidos?.map((pedido) => pedido._id);
        res.json({ data: pedidosIds });
    }
    catch (error) {
        res.status(500).send({ message: "Error interno del servidor." });
    }
}
async function getPedidosConDetalles(req, res) {
    try {
        const pedidos = await repository.findAll() || [];
        // Obtener detalles de usuarios y libros
        const pedidosConDetalles = await Promise.all(pedidos.map(async (pedido) => {
            // Obtener el nombre de usuario
            const usuario = await usuarioRepository.getById(pedido.usuario.toString());
            const username = usuario?.username || 'Usuario no disponible';
            // Obtener los títulos de los libros
            const titulos = await Promise.all(pedido.libro.map(async (libroId) => {
                const libro = await libroRepository.getById(libroId.toString());
                return libro?.titulo || 'Libro no disponible';
            }));
            return {
                ...pedido,
                username,
                titulos: titulos.join(', '),
            };
        }));
        res.status(200).send({ data: pedidosConDetalles });
    }
    catch (error) {
        console.error("Error en getPedidosConDetalles:", error);
        res.status(500).send({ message: "Error interno del servidor." });
    }
}
export { sanitizeInput, findAll, findOne, add, update, remove, findByUsuario, findByLibro, getpedidos, getPedidosConDetalles };
//# sourceMappingURL=Pedido.controller.js.map