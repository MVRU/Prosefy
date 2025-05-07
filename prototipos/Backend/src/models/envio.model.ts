import { Schema, model } from 'mongoose';

const envioSchema = new Schema({
    precio: { type: Number, required: true },
    fecha_entrega_estimada: { type: Date, required: true },
    fecha_entrega_real: { type: Date },
    envio_gratis: { type: Boolean, default: false }
}, { timestamps: true });

export const EnvioModel = model('Envio', envioSchema, "envios");
