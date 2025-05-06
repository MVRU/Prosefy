"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoRepository = void 0;
const pedido_model_1 = require("../models/pedido.model");
exports.PedidoRepository = {
    crear: (data) => pedido_model_1.PedidoModel.create(data),
    obtenerTodos: () => pedido_model_1.PedidoModel.find().populate('usuario envio items.libro'),
    obtenerPorId: (id) => pedido_model_1.PedidoModel.findById(id).populate('usuario envio items.libro'),
    actualizar: (id, data) => pedido_model_1.PedidoModel.findByIdAndUpdate(id, data, { new: true }),
    eliminar: (id) => pedido_model_1.PedidoModel.findByIdAndDelete(id),
    obtenerPorUsuario: (usuarioId) => pedido_model_1.PedidoModel.find({ usuario: usuarioId }).populate('envio items.libro')
};
