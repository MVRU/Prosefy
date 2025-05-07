import { Schema, model, Types } from 'mongoose';

const resenaSchema = new Schema({
    calificacion: { type: Number, required: true, min: 1, max: 5 },
    comentario: { type: String },
    usuario: { type: Types.ObjectId, ref: 'Usuario', required: true },
    libro: { type: Types.ObjectId, ref: 'Libro', required: true }
}, { timestamps: true });

export default model('Resena', resenaSchema, 'resenas');
