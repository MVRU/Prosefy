import { Request, Response, NextFunction } from "express";
import { EditorialServicio } from "../services/editorial.service";

export const EditorialControlador = {
    async crear(req: Request, res: Response, next: NextFunction) {
        try {
            const editorial = await EditorialServicio.crearEditorial(req.body);
            res.status(201).json(editorial);
        } catch (error) {
            next(error);
        }
    },

    async obtenerTodos(req: Request, res: Response, next: NextFunction) {
        try {
            const editoriales = await EditorialServicio.obtenerEditoriales();
            res.json(editoriales);
        } catch (error) {
            next(error);
        }
    },

    async actualizar(req: Request, res: Response, next: NextFunction) {
        try {
            const editorial = await EditorialServicio.actualizarEditorial(req.params.id, req.body);
            res.json(editorial);
        } catch (error) {
            next(error);
        }
    },

    async eliminar(req: Request, res: Response, next: NextFunction) {
        try {
            await EditorialServicio.eliminarEditorial(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
};
