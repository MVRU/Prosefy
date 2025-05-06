import { PedidoRepository } from '../repositories/pedido.repository';

export const PedidoService = {
    crearPedido: PedidoRepository.crear,
    obtenerPedidos: PedidoRepository.obtenerTodos,
    obtenerPedidoPorId: PedidoRepository.obtenerPorId,
    actualizarPedido: PedidoRepository.actualizar,
    eliminarPedido: PedidoRepository.eliminar,
    obtenerPedidosPorUsuario: PedidoRepository.obtenerPorUsuario
};
