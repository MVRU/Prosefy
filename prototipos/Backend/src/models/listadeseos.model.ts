import mongoose, { Schema, Document } from 'mongoose';

export interface IListaDeseos extends Document {
    usuario: mongoose.Types.ObjectId;
    libro: mongoose.Types.ObjectId;
}

const ListaDeseosSchema = new Schema<IListaDeseos>(
    {
        usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
        libro: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro', required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IListaDeseos>('ListaDeseos', ListaDeseosSchema);