import { PedidoModel } from '../models/pedido.model';

export const PedidoRepository = {
    crear: (data: any) => PedidoModel.create(data),
    obtenerTodos: () => PedidoModel.find().populate('usuario envio items.libro'),
    obtenerPorId: (id: string) => PedidoModel.findById(id).populate('usuario envio items.libro'),
    actualizar: (id: string, data: any) => PedidoModel.findByIdAndUpdate(id, data, { new: true }),
    eliminar: (id: string) => PedidoModel.findByIdAndDelete(id),
    obtenerPorUsuario: (usuarioId: string) => PedidoModel.find({ usuario: usuarioId }).populate('envio items.libro')
};
