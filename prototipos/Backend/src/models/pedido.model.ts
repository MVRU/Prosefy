import mongoose, { Schema, model, Types } from 'mongoose';

interface IItemPedido {
    libro: Types.ObjectId;
    cantidad: number;
    precio_unitario: number;
}

interface IPedido {
    usuario: Types.ObjectId;
    items: IItemPedido[];
    metodo_pago: 'debito' | 'transferencia' | 'efectivo' | 'tarjeta';
    estado: 'pendiente' | 'procesado' | 'enviado' | 'entregado';
    total: number;
    envio: number;
    fecha_hora: Date;
}

const itemPedidoSchema = new Schema({
    libro: { type: Schema.Types.ObjectId, ref: 'Libro', required: true },
    cantidad: { type: Number, required: true },
    precio_unitario: { type: Number, required: true }
}, { _id: false });

const pedidoSchema = new Schema<IPedido>({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    items: [itemPedidoSchema],
    metodo_pago: { type: String, enum: ['debito', 'transferencia', 'efectivo', 'tarjeta'], required: true },
    estado: { type: String, enum: ['pendiente', 'procesado', 'enviado', 'entregado'], default: 'pendiente' },
    total: { type: Number, required: true },
    envio: { type: Number, default: 0 },
    fecha_hora: { type: Date, default: Date.now }
});

export const PedidoModel = model<IPedido>('Pedido', pedidoSchema);