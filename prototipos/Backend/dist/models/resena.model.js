"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const resenaSchema = new mongoose_1.Schema({
    calificacion: { type: Number, required: true, min: 1, max: 5 },
    comentario: { type: String },
    usuario: { type: mongoose_1.Types.ObjectId, ref: 'Usuario', required: true },
    libro: { type: mongoose_1.Types.ObjectId, ref: 'Libro', required: true }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Resena', resenaSchema);
