import { Request, Response } from 'express';
import CategoriaService from '../services/categoria.service';

export class CategoriaController {

    static async crearCategoria(req: Request, res: Response) {
        try {
            const { nombre } = req.body;

            if (!nombre || typeof nombre !== 'string') {
                res.status(400).json({ error: 'El nombre es obligatorio.' });
            }

            const nuevaCategoria = await CategoriaService.crearCategoria(nombre);
            res.status(201).json(nuevaCategoria);
        } catch (error) {
            console.error('Error al crear categoría:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async obtenerCategorias(req: Request, res: Response) {
        try {
            const categorias = await CategoriaService.obtenerCategorias();
            res.json(categorias);
        } catch (error) {
            console.error('Error obteniendo categorías:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async actualizarCategoria(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nombre } = req.body;

            if (!nombre || typeof nombre !== 'string') {
                res.status(400).json({ error: 'El nombre es obligatorio.' });
            }

            const categoriaActualizada = await CategoriaService.actualizarCategoria(id, nombre);
            if (!categoriaActualizada) {
                res.status(404).json({ error: 'Categoría no encontrada' });
            }

            res.json(categoriaActualizada);
        } catch (error) {
            console.error('Error al actualizar categoría:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async eliminarCategoria(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await CategoriaService.eliminarCategoria(id);
            res.json({ message: 'Categoría eliminada exitosamente' });
        } catch (error) {
            console.error('Error al eliminar categoría:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}