import { Request, Response, NextFunction } from 'express';
import { EnvioService } from '../services/envio.service';

export const EnvioController = {
    crear: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const envio = await EnvioService.crearEnvio(req.body);
            res.status(201).json(envio);
        } catch (error) {
            next(error);
        }
    },

    listar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const envios = await EnvioService.obtenerEnvios();
            res.json(envios);
        } catch (error) {
            next(error);
        }
    },

    obtener: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const envio = await EnvioService.obtenerEnvioPorId(req.params.id);
            if (!envio) res.status(404).json({ msg: 'No encontrado' });
            res.json(envio);
        } catch (error) {
            next(error);
        }
    },

    actualizar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const actualizado = await EnvioService.actualizarEnvio(req.params.id, req.body);
            res.json(actualizado);
        } catch (error) {
            next(error);
        }
    },

    eliminar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await EnvioService.eliminarEnvio(req.params.id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
};
