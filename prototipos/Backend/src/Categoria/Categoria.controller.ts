import { Request, Response, NextFunction } from "express"
import { CategoriaRepository } from "./Categoria.repository.js"
import { Categoria } from "./Categoria.js"

const repository = new CategoriaRepository()

async function sanitizeInput(req: Request, res: Response, next: NextFunction) {
    try {
        req.body.sanitizedInput = {
            id: req.body.id,
            descripcion: req.body.descripcion,
        };
        Object.keys(req.body.sanitizedInput).forEach((key) => {
            if (req.body.sanitizedInput[key] === undefined) {
                delete req.body.sanitizedInput[key];
            }
        });
        next();
    } catch (error) {
        console.error("Error en sanitizeInput:", error);
        res.status(500).send({ message: "Error interno del servidor" });
    }
}

async function findAll(req: Request, res: Response) {
    try {
        res.json({ data: await repository.findAll() });
    } catch (error) {
        console.error("Error en findAll:", error);
        res.status(500).send({ message: "Error interno del servidor" });
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const categoria = await repository.findOne({ id });
        if (!categoria) {
            return res.status(404).send({ message: "Categoría no encontrada" });
        }
        return res.json({ data: categoria });
    } catch (error) {
        console.error("Error en findOne:", error);
        res.status(500).send({ message: "Error interno del servidor" });
    }
}

async function add(req: Request, res: Response) {
    try {
        const input = req.body.sanitizedInput;
        const categoriaInput = new Categoria(input.id, input.descripcion);
        const categoria = await repository.add(categoriaInput);
        res.status(201).send({ message: 'Categoría agregada con éxito', data: categoria });
    } catch (error) {
        console.error("Error en add:", error);
        res.status(500).send({ message: "Error interno del servidor" });
    }
}

async function update(req: Request, res: Response) {
    try {
        const categoria = await repository.update(req.params.id, req.body.sanitizedInput);
        if (!categoria) {
            return res.status(404).send({ message: "Categoría no encontrada" });
        }
        return res.status(200).send({ message: 'Categoría actualizada con éxito', data: categoria });
    } catch (error) {
        console.error("Error en update:", error);
        res.status(500).send({ message: "Error interno del servidor" });
    }
}

async function remove(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const categoria = await repository.delete({ id });
        if (!categoria) {
            res.status(404).send({ message: "Categoría no encontrada" });
        }
        res.status(204).send({ message: 'Categoría eliminada con éxito' });
    } catch (error) {
        console.error("Error en remove:", error);
        res.status(500).send({ message: "Error interno del servidor" });
    }
}

async function obtenerDescripcionesCategoria(req: Request, res: Response) {
    try {
        const categoria = await repository.findAll();
        if (categoria) {
            const descripciones = categoria.map((categoria: Categoria) => categoria.descripcion);
            res.json(descripciones);
        } else {
            res.status(404).send({ message: "No se encontraron categorías" });
        }
    } catch (error) {
        console.error("Error en obtener las descripciones de las categorías:", error);
        res.status(500).send({ message: "Error interno del servidor" });
    }
}

export { sanitizeInput, findAll, findOne, add, update, remove, obtenerDescripcionesCategoria }