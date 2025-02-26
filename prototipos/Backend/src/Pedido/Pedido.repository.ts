import { Repository } from "../Shared/repository.js";
import { Pedido } from "./Pedido.js";
import { db } from "../Shared/db/conn.mongo.js";
import { ObjectId } from 'mongodb'

const pedidos = db.collection<Pedido>('pedidos')

export class PedidoRepository implements Repository<Pedido> {

    public async findAll(): Promise<Pedido[] | undefined> {
        try {
            return await pedidos.find().toArray()
        } catch (error) {
            console.error("Error en findAll:", error);
            throw error;
        }
    }

    public async findOne(item: { id: string; }): Promise<Pedido | undefined> {
        try {
            const _id = new ObjectId(item.id)
            return (await pedidos.findOne({ _id })) || undefined
        } catch (error) {
            console.error("Error en findOne:", error);
            throw error;
        }
    }

    public async add(item: Pedido): Promise<Pedido | undefined> {
        try {
            item._id = (await pedidos.insertOne(item)).insertedId
            return item
        } catch (error) {
            console.error("Error en add:", error);
            throw error;
        }
    }

    public async update(id: string, item: Pedido): Promise<Pedido | undefined> {
        try {
            const _id = new ObjectId(id)
            return (await pedidos.findOneAndUpdate({ _id }, { $set: item },
                { returnDocument: 'after' })) || undefined
        } catch (error) {
            console.error("Error en update:", error);
            throw error;
        }
    }

    public async delete(item: { id: string; }): Promise<Pedido | undefined> {
        try {
            const _id = new ObjectId(item.id)
            return (await pedidos.findOneAndDelete({ _id })) || undefined
        } catch (error) {
            console.error("Error en delete:", error);
            throw error;
        }
    }

    public async findByUsuario(usuarioId: string): Promise<Pedido[] | undefined> {
        try {
            const todasLaspedidos = await pedidos.find().toArray();

            const pedidosFiltradas = todasLaspedidos.filter(Pedido =>
                Pedido.usuario.toString() === usuarioId
            );

            return pedidosFiltradas;
        } catch (error) {
            console.error("Error en findByUsuario:", error);
            throw error;
        }
    }

    public async findByLibro(libroId: string): Promise<Pedido[] | undefined> {
        try {
            const todasLaspedidos = await pedidos.find().toArray();

            const pedidosFiltradas = todasLaspedidos.filter(Pedido =>
                Pedido.libro.toString() === libroId
            );

            return pedidosFiltradas;
        } catch (error) {
            console.error("Error en findByLibro:", error);
            throw error;
        }
    }

    public async getByUsuarioId(usuarioId: string) {
        return pedidos.findOne({ _id: new ObjectId(usuarioId) });
    }

    public async getLibroById(libroId: string) {
        return pedidos.findOne({ _id: new ObjectId(libroId) });
    }

}
