"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorialModel = void 0;
const mongoose_1 = require("mongoose");
const editorialSchema = new mongoose_1.Schema({
    descripcion: { type: String, required: true },
    direccion: { type: String },
    imagen: { type: String },
}, { timestamps: true });
exports.EditorialModel = (0, mongoose_1.model)("Editorial", editorialSchema);
