"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ofertaSchema = new mongoose_1.Schema({
    fecha_inicial: { type: Date, required: true },
    fecha_final: { type: Date, required: true },
    porcentaje_descuento: { type: Number, required: true },
    libros: [{ type: mongoose_1.Types.ObjectId, ref: 'Libro', required: true }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Oferta', ofertaSchema);
