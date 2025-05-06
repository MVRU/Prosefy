import { Request, Response, NextFunction } from 'express';
import { ResenaService } from '../services/resena.service';

export const ResenaController = {
    crear: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const resena = await ResenaService.crearResena(req.body);
            res.status(201).json(resena);
        } catch (error) {
            next(error);
        }
    },

    listar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const resenas = await ResenaService.obtenerResenas();
            res.json(resenas);
        } catch (error) {
            next(error);
        }
    },

    obtener: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const resena = await ResenaService.obtenerResenaPorId(req.params.id);
            if (!resena) res.status(404).json({ msg: 'No encontrada' });
            res.json(resena);
        } catch (error) {
            next(error);
        }
    },

    actualizar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const actualizada = await ResenaService.actualizarResena(req.params.id, req.body);
            res.json(actualizada);
        } catch (error) {
            next(error);
        }
    },

    eliminar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await ResenaService.eliminarResena(req.params.id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
};
