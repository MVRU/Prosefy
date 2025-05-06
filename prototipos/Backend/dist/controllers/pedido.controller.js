"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoController = void 0;
const pedido_service_1 = require("../services/pedido.service");
exports.PedidoController = {
    crear: async (req, res, next) => {
        try {
            const pedido = await pedido_service_1.PedidoService.crearPedido(req.body);
            res.status(201).json(pedido);
        }
        catch (error) {
            next(error);
        }
    },
    listar: async (req, res, next) => {
        try {
            const pedidos = await pedido_service_1.PedidoService.obtenerPedidos();
            res.json(pedidos);
        }
        catch (error) {
            next(error);
        }
    },
    obtener: async (req, res, next) => {
        try {
            const pedido = await pedido_service_1.PedidoService.obtenerPedidoPorId(req.params.id);
            if (!pedido)
                res.status(404).json({ msg: 'No encontrado' });
            res.json(pedido);
        }
        catch (error) {
            next(error);
        }
    },
    actualizar: async (req, res, next) => {
        try {
            const actualizado = await pedido_service_1.PedidoService.actualizarPedido(req.params.id, req.body);
            res.json(actualizado);
        }
        catch (error) {
            next(error);
        }
    },
    eliminar: async (req, res, next) => {
        try {
            await pedido_service_1.PedidoService.eliminarPedido(req.params.id);
            res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    },
    listarPorUsuario: async (req, res, next) => {
        try {
            const pedidos = await pedido_service_1.PedidoService.obtenerPedidosPorUsuario(req.params.usuarioId);
            res.json(pedidos);
        }
        catch (error) {
            next(error);
        }
    }
};
