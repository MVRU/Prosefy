"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const localidadSchema = new mongoose_1.Schema({
    descripcion: { type: String, required: true },
    provincia: { type: mongoose_1.Types.ObjectId, ref: 'Provincia', required: true }
});
exports.default = (0, mongoose_1.model)('Localidad', localidadSchema);
