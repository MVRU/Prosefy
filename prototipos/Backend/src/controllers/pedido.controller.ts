import { Request, Response, NextFunction } from 'express';
import { PedidoService } from '../services/pedido.service';

export const PedidoController = {
    crear: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const pedido = await PedidoService.crearPedido(req.body);
            res.status(201).json(pedido);
        } catch (error) {
            next(error);
        }
    },

    listar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const pedidos = await PedidoService.obtenerPedidos();
            res.json(pedidos);
        } catch (error) {
            next(error);
        }
    },

    obtener: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const pedido = await PedidoService.obtenerPedidoPorId(req.params.id);
            if (!pedido) res.status(404).json({ msg: 'No encontrado' });
            res.json(pedido);
        } catch (error) {
            next(error);
        }
    },

    actualizar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const actualizado = await PedidoService.actualizarPedido(req.params.id, req.body);
            res.json(actualizado);
        } catch (error) {
            next(error);
        }
    },

    eliminar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await PedidoService.eliminarPedido(req.params.id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    },

    listarPorUsuario: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const pedidos = await PedidoService.obtenerPedidosPorUsuario(req.params.usuarioId);
            res.json(pedidos);
        } catch (error) {
            next(error);
        }
    }
};
