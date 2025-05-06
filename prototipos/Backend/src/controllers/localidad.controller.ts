import { Request, Response, NextFunction } from 'express';
import { LocalidadService } from '../services/localidad.service';

export const LocalidadController = {
    crear: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const localidad = await LocalidadService.crearLocalidad(req.body);
            res.status(201).json(localidad);
        } catch (error) {
            next(error);
        }
    },

    listar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const localidades = await LocalidadService.obtenerLocalidades();
            res.json(localidades);
        } catch (error) {
            next(error);
        }
    },

    obtener: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const localidad = await LocalidadService.obtenerLocalidadPorId(req.params.id);
            if (!localidad) res.status(404).json({ msg: 'No encontrada' });
            res.json(localidad);
        } catch (error) {
            next(error);
        }
    },

    actualizar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const actualizada = await LocalidadService.actualizarLocalidad(req.params.id, req.body);
            res.json(actualizada);
        } catch (error) {
            next(error);
        }
    },

    eliminar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await LocalidadService.eliminarLocalidad(req.params.id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
};
