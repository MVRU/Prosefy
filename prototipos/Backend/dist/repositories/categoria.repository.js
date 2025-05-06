"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
class CategoriaRepository {
    // Crear una categoría
    async crearCategoria(nombre) {
        const nuevaCategoria = new categoria_model_1.default({ nombre });
        return nuevaCategoria.save();
    }
    // Obtener todas las categorías
    async obtenerCategorias() {
        return categoria_model_1.default.find();
    }
    // Obtener una categoría por nombre
    async obtenerCategoriaPorNombre(nombre) {
        return categoria_model_1.default.findOne({ nombre });
    }
    // Actualizar una categoría
    async actualizarCategoria(id, nombre) {
        return categoria_model_1.default.findByIdAndUpdate(id, { nombre }, { new: true });
    }
    // Eliminar una categoría
    async eliminarCategoria(id) {
        return categoria_model_1.default.findByIdAndDelete(id);
    }
}
exports.default = new CategoriaRepository();
