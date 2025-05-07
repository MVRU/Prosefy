import { Schema, model, Types } from 'mongoose';

const ofertaSchema = new Schema({
    fecha_inicial: { type: Date, required: true },
    fecha_final: { type: Date, required: true },
    porcentaje_descuento: { type: Number, required: true },
    libros: [{ type: Types.ObjectId, ref: 'Libro', required: true }]
}, { timestamps: true });

export default model('Oferta', ofertaSchema, "ofertas");
