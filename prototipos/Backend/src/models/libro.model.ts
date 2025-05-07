import mongoose, { Schema, Document } from "mongoose";

export interface ILibro extends Document {
    isbn: string;
    titulo: string;
    idioma: string;
    descripcion: string;
    precio: number;
    fecha_edicion: Date;
    portada: string;
    formatos: string[];
    autores: mongoose.Types.ObjectId[];
    categorias: mongoose.Types.ObjectId[];
    editorial: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const LibroSchema = new Schema<ILibro>(
    {
        isbn: { type: String, required: true, unique: true },
        titulo: { type: String, required: true },
        idioma: { type: String, required: true },
        descripcion: { type: String },
        precio: { type: Number, required: true },
        fecha_edicion: { type: Date, required: true },
        portada: { type: String },
        formatos: {
            type: [String],
            enum: ["fisico", "digital", "audiolibro"],
            required: true
        },
        autores: [{ type: Schema.Types.ObjectId, ref: "Autor", required: true }],
        categorias: [{ type: Schema.Types.ObjectId, ref: "Categoria", required: true }],
        editorial: { type: Schema.Types.ObjectId, ref: "Editorial", required: true }
    },
    {
        timestamps: true
    }
);

export const Libro = mongoose.model<ILibro>("Libro", LibroSchema, "libros");
