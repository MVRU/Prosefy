import { Schema, model, Document } from 'mongoose';

interface Categoria extends Document {
    nombre: string;
}

const categoriaSchema = new Schema<Categoria>({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
}, {
    timestamps: true,
});

const CategoriaModel = model<Categoria>('Categoria', categoriaSchema);

export default CategoriaModel;
