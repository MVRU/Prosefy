import mongoose, { Schema, Document } from 'mongoose';
import { ILibro } from './libro.model';

export interface IListaDeseos extends Document {
    usuario: mongoose.Types.ObjectId;
    libros: mongoose.Types.ObjectId[];
}

const ListaDeseosSchema = new Schema<IListaDeseos>({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        unique: true
    },
    libros: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Libro'
        }
    ]
}, {
    timestamps: true
});

export default mongoose.model<IListaDeseos>('ListaDeseos', ListaDeseosSchema, 'listas_deseos');