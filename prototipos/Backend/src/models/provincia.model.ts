import { Schema, model, Document } from 'mongoose';

interface Provincia extends Document {
    descripcion: string;
}

const provinciaSchema = new Schema<Provincia>({
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

const ProvinciaModel = model<Provincia>('Provincia', provinciaSchema, 'provincias');

export default ProvinciaModel;