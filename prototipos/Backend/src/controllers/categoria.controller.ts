import { Request, Response } from 'express';
import CategoriaService from '../services/categoria.service';

export class CategoriaController {

    // Crear una categoría
    static async crearCategoria(req: Request, res: Response) {
        try {
            const { nombre } = req.body;
            const nuevaCategoria = await CategoriaService.crearCategoria(nombre);
            res.status(201).json(nuevaCategoria);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear la categoría.' });
        }
    }

    // Obtener todas las categorías
    static async obtenerCategorias(req: Request, res: Response) {
        try {
            const categorias = await CategoriaService.obtenerCategorias();
            res.status(200).json(categorias);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las categorías.' });
        }
    }

    // Actualizar una categoría
    static async actualizarCategoria(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nombre } = req.body;
            const categoriaActualizada = await CategoriaService.actualizarCategoria(id, nombre);
            res.status(200).json(categoriaActualizada);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la categoría.' });
        }
    }

    // Eliminar una categoría
    static async eliminarCategoria(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await CategoriaService.eliminarCategoria(id);
            res.status(200).json({ message: 'Categoría eliminada exitosamente.' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la categoría.' });
        }
    }
}