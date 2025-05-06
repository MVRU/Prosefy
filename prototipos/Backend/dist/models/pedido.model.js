"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoModel = void 0;
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    libro: { type: mongoose_1.Types.ObjectId, ref: 'Libro', required: true },
    cantidad: { type: Number, required: true },
    precio_unitario: { type: Number, required: true }
}, { _id: false });
const pedidoSchema = new mongoose_1.Schema({
    usuario: { type: mongoose_1.Types.ObjectId, ref: 'Usuario', required: true },
    items: [itemSchema],
    total: { type: Number, required: true },
    estado: { type: String, enum: ['pendiente', 'procesado', 'enviado', 'entregado'], default: 'pendiente' },
    fecha_hora: { type: Date, default: Date.now },
    metodo_pago: { type: String, required: true },
    envio: { type: mongoose_1.Types.ObjectId, ref: 'Envio' }
}, { timestamps: true });
exports.PedidoModel = (0, mongoose_1.model)('Pedido', pedidoSchema);
