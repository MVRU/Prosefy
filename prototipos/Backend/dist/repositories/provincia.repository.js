"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const provincia_model_1 = __importDefault(require("../models/provincia.model"));
class ProvinciaRepository {
    // Crear una provincia
    async crearProvincia(descripcion) {
        const nuevaProvincia = new provincia_model_1.default({ descripcion });
        return nuevaProvincia.save();
    }
    // Obtener todas las provincias
    async obtenerProvincias() {
        return provincia_model_1.default.find();
    }
    // Obtener una provincia por descripción
    async obtenerProvinciaPorDescripcion(descripcion) {
        return provincia_model_1.default.findOne({ descripcion });
    }
    // Actualizar una provincia
    async actualizarProvincia(id, descripcion) {
        return provincia_model_1.default.findByIdAndUpdate(id, { descripcion }, { new: true });
    }
    // Eliminar una provincia
    async eliminarProvincia(id) {
        return provincia_model_1.default.findByIdAndDelete(id);
    }
}
exports.default = new ProvinciaRepository();
