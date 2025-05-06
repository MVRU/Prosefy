"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoria_repository_1 = __importDefault(require("../repositories/categoria.repository"));
class CategoriaService {
    // Crear una nueva categoría
    async crearCategoria(nombre) {
        const categoriaExistente = await categoria_repository_1.default.obtenerCategoriaPorNombre(nombre);
        if (categoriaExistente)
            throw new Error('La categoría ya existe');
        return categoria_repository_1.default.crearCategoria(nombre);
    }
    // Obtener todas las categorías
    async obtenerCategorias() {
        return categoria_repository_1.default.obtenerCategorias();
    }
    // Actualizar una categoría
    async actualizarCategoria(id, nombre) {
        return categoria_repository_1.default.actualizarCategoria(id, nombre);
    }
    // Eliminar una categoría
    async eliminarCategoria(id) {
        return categoria_repository_1.default.eliminarCategoria(id);
    }
}
exports.default = new CategoriaService();
