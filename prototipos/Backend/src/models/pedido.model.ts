import { Schema, model, Types } from 'mongoose';

const itemSchema = new Schema({
    libro: { type: Types.ObjectId, ref: 'Libro', required: true },
    cantidad: { type: Number, required: true },
    precio_unitario: { type: Number, required: true }
}, { _id: false });

const pedidoSchema = new Schema({
    usuario: { type: Types.ObjectId, ref: 'Usuario', required: true },
    items: [itemSchema],
    total: { type: Number, required: true },
    estado: { type: String, enum: ['pendiente', 'procesado', 'enviado', 'entregado'], default: 'pendiente' },
    fecha_hora: { type: Date, default: Date.now },
    metodo_pago: { type: String, required: true },
    envio: { type: Types.ObjectId, ref: 'Envio' }
}, { timestamps: true });

export const PedidoModel = model('Pedido', pedidoSchema);
