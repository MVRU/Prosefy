import { Schema, model, Types } from 'mongoose';

const localidadSchema = new Schema({
    descripcion: { type: String, required: true },
    provincia: { type: Types.ObjectId, ref: 'Provincia', required: true }
});

export default model('Localidad', localidadSchema);
