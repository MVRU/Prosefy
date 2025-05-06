"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaController = void 0;
const categoria_service_1 = __importDefault(require("../services/categoria.service"));
class CategoriaController {
    // Crear una categoría
    static async crearCategoria(req, res) {
        try {
            const { nombre } = req.body;
            const nuevaCategoria = await categoria_service_1.default.crearCategoria(nombre);
            res.status(201).json(nuevaCategoria);
        }
        catch (error) {
            res.status(500).json({ error: 'Error al crear la categoría.' });
        }
    }
    // Obtener todas las categorías
    static async obtenerCategorias(req, res) {
        try {
            const categorias = await categoria_service_1.default.obtenerCategorias();
            res.status(200).json(categorias);
        }
        catch (error) {
            res.status(500).json({ error: 'Error al obtener las categorías.' });
        }
    }
    // Actualizar una categoría
    static async actualizarCategoria(req, res) {
        try {
            const { id } = req.params;
            const { nombre } = req.body;
            const categoriaActualizada = await categoria_service_1.default.actualizarCategoria(id, nombre);
            res.status(200).json(categoriaActualizada);
        }
        catch (error) {
            res.status(500).json({ error: 'Error al actualizar la categoría.' });
        }
    }
    // Eliminar una categoría
    static async eliminarCategoria(req, res) {
        try {
            const { id } = req.params;
            await categoria_service_1.default.eliminarCategoria(id);
            res.status(200).json({ message: 'Categoría eliminada exitosamente.' });
        }
        catch (error) {
            res.status(500).json({ error: 'Error al eliminar la categoría.' });
        }
    }
}
exports.CategoriaController = CategoriaController;
