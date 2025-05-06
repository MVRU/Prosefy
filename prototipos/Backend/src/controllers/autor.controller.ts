import { Request, Response, NextFunction } from "express";
import { AutorServicio } from "../services/autor.service";

export const AutorControlador = {
    async crear(req: Request, res: Response, next: NextFunction) {
        try {
            const autor = await AutorServicio.crearAutor(req.body);
            res.status(201).json(autor);
        } catch (error) {
            next(error);
        }
    },

    async obtenerTodos(req: Request, res: Response, next: NextFunction) {
        try {
            const autores = await AutorServicio.obtenerAutores();
            res.json(autores);
        } catch (error) {
            next(error);
        }
    },

    async actualizar(req: Request, res: Response, next: NextFunction) {
        try {
            const autor = await AutorServicio.actualizarAutor(req.params.id, req.body);
            res.json(autor);
        } catch (error) {
            next(error);
        }
    },

    async eliminar(req: Request, res: Response, next: NextFunction) {
        try {
            await AutorServicio.eliminarAutor(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
};
