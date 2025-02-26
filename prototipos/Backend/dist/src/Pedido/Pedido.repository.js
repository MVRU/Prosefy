import { db } from "../Shared/db/conn.mongo.js";
import { ObjectId } from 'mongodb';
const pedidos = db.collection('pedidos');
export class PedidoRepository {
    async findAll() {
        try {
            return await pedidos.find().toArray();
        }
        catch (error) {
            console.error("Error en findAll:", error);
            throw error;
        }
    }
    async findOne(item) {
        try {
            const _id = new ObjectId(item.id);
            return (await pedidos.findOne({ _id })) || undefined;
        }
        catch (error) {
            console.error("Error en findOne:", error);
            throw error;
        }
    }
    async add(item) {
        try {
            item._id = (await pedidos.insertOne(item)).insertedId;
            return item;
        }
        catch (error) {
            console.error("Error en add:", error);
            throw error;
        }
    }
    async update(id, item) {
        try {
            const _id = new ObjectId(id);
            return (await pedidos.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' })) || undefined;
        }
        catch (error) {
            console.error("Error en update:", error);
            throw error;
        }
    }
    async delete(item) {
        try {
            const _id = new ObjectId(item.id);
            return (await pedidos.findOneAndDelete({ _id })) || undefined;
        }
        catch (error) {
            console.error("Error en delete:", error);
            throw error;
        }
    }
    async findByUsuario(usuarioId) {
        try {
            const todasLaspedidos = await pedidos.find().toArray();
            const pedidosFiltradas = todasLaspedidos.filter(Pedido => Pedido.usuario.toString() === usuarioId);
            return pedidosFiltradas;
        }
        catch (error) {
            console.error("Error en findByUsuario:", error);
            throw error;
        }
    }
    async findByLibro(libroId) {
        try {
            const todasLaspedidos = await pedidos.find().toArray();
            const pedidosFiltradas = todasLaspedidos.filter(Pedido => Pedido.libro.toString() === libroId);
            return pedidosFiltradas;
        }
        catch (error) {
            console.error("Error en findByLibro:", error);
            throw error;
        }
    }
    async getByUsuarioId(usuarioId) {
        return pedidos.findOne({ _id: new ObjectId(usuarioId) });
    }
    async getLibroById(libroId) {
        return pedidos.findOne({ _id: new ObjectId(libroId) });
    }
}
//# sourceMappingURL=Pedido.repository.js.map