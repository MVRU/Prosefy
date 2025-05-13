import { Request, Response, NextFunction } from "express";
import { AutorServicio } from "../services/autor.service";

export async function crear(req: Request, res: Response, next: NextFunction) {
    try {
        const autor = await AutorServicio.crearAutor(req.body);
        res.status(201).json(autor);
    } catch (error) {
        next(error);
    }
}

export async function obtenerTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const autores = await AutorServicio.obtenerAutores();
        res.json(autores);
    } catch (error) {
        next(error);
    }
}

export async function obtenerPorId(req: Request, res: Response, next: NextFunction) {
    try {
        const autor = await AutorServicio.obtenerAutorPorId(req.params.id);
        if (!autor) {
            res.status(404).json({ mensaje: "Autor no encontrado" });
        }
        res.json(autor);
    } catch (error) {
        next(error);
    }
}

export async function actualizar(req: Request, res: Response, next: NextFunction) {
    try {
        const autor = await AutorServicio.actualizarAutor(req.params.id, req.body);
        res.json(autor);
    } catch (error) {
        next(error);
    }
}

export async function eliminar(req: Request, res: Response, next: NextFunction) {
    try {
        await AutorServicio.eliminarAutor(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}