import { Schema, model } from "mongoose";

const autorSchema = new Schema(
    {
        nombre_completo: { type: String, required: true },
        perfil: { type: String },
        info: { type: String },
    },
    { timestamps: true }
);

export const AutorModel = model("Autor", autorSchema);
