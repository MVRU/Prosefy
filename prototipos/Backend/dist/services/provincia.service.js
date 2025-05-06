"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const provincia_repository_1 = __importDefault(require("../repositories/provincia.repository"));
class ProvinciaService {
    // Crear una nueva provincia
    async crearProvincia(descripcion) {
        const provinciaExistente = await provincia_repository_1.default.obtenerProvinciaPorDescripcion(descripcion);
        if (provinciaExistente)
            throw new Error('La provincia ya existe');
        return provincia_repository_1.default.crearProvincia(descripcion);
    }
    // Obtener todas las provincias
    async obtenerProvincias() {
        return provincia_repository_1.default.obtenerProvincias();
    }
    // Actualizar una provincia
    async actualizarProvincia(id, descripcion) {
        return provincia_repository_1.default.actualizarProvincia(id, descripcion);
    }
    // Eliminar una provincia
    async eliminarProvincia(id) {
        return provincia_repository_1.default.eliminarProvincia(id);
    }
}
exports.default = new ProvinciaService();
