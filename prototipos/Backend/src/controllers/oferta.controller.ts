import { Request, Response, NextFunction } from 'express';
import { OfertaService } from '../services/oferta.service';

export const OfertaController = {
    crear: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const oferta = await OfertaService.crearOferta(req.body);
            res.status(201).json(oferta);
        } catch (error) {
            next(error);
        }
    },

    listar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const ofertas = await OfertaService.obtenerOfertas();
            res.json(ofertas);
        } catch (error) {
            next(error);
        }
    },

    obtener: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const oferta = await OfertaService.obtenerOfertaPorId(req.params.id);
            if (!oferta) res.status(404).json({ msg: 'No encontrada' });
            res.json(oferta);
        } catch (error) {
            next(error);
        }
    },

    actualizar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const actualizada = await OfertaService.actualizarOferta(req.params.id, req.body);
            res.json(actualizada);
        } catch (error) {
            next(error);
        }
    },

    eliminar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await OfertaService.eliminarOferta(req.params.id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
};
