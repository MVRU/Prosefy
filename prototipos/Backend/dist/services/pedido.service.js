"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoService = void 0;
const pedido_repository_1 = require("../repositories/pedido.repository");
exports.PedidoService = {
    crearPedido: pedido_repository_1.PedidoRepository.crear,
    obtenerPedidos: pedido_repository_1.PedidoRepository.obtenerTodos,
    obtenerPedidoPorId: pedido_repository_1.PedidoRepository.obtenerPorId,
    actualizarPedido: pedido_repository_1.PedidoRepository.actualizar,
    eliminarPedido: pedido_repository_1.PedidoRepository.eliminar,
    obtenerPedidosPorUsuario: pedido_repository_1.PedidoRepository.obtenerPorUsuario
};
