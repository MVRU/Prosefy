"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvioModel = void 0;
const mongoose_1 = require("mongoose");
const envioSchema = new mongoose_1.Schema({
    precio: { type: Number, required: true },
    fecha_entrega_estimada: { type: Date, required: true },
    fecha_entrega_real: { type: Date },
    envio_gratis: { type: Boolean, default: false }
}, { timestamps: true });
exports.EnvioModel = (0, mongoose_1.model)('Envio', envioSchema);
