"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutorModel = void 0;
const mongoose_1 = require("mongoose");
const autorSchema = new mongoose_1.Schema({
    nombre_completo: { type: String, required: true },
    perfil: { type: String },
    info: { type: String },
}, { timestamps: true });
exports.AutorModel = (0, mongoose_1.model)("Autor", autorSchema);
