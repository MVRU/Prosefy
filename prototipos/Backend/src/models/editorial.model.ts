import { Schema, model } from "mongoose";

const editorialSchema = new Schema(
    {
        descripcion: { type: String, required: true },
        direccion: { type: String },
        imagen: { type: String },
    },
    { timestamps: true }
);

export const EditorialModel = model("Editorial", editorialSchema, "editoriales");
