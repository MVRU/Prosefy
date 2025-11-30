import { Request, Response, NextFunction } from "express";
import * as libroService from "../services/libro.service";

export const crearLibro = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const libro = await libroService.crearLibro(req.body);
        res.status(201).json(libro);
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(409).json({ error: "El ISBN ya está registrado." });
        } else {
            next(error);
        }
    }
};

export const obtenerLibros = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const libros = await libroService.obtenerLibros();
        res.json(libros);
    } catch (error) {
        next(error);
    }
};

export const obtenerLibro = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const libro = await libroService.obtenerLibroPorId(req.params.id);
        if (!libro) {
            res.status(404).json({ error: "Libro no encontrado" });
        } else {
            res.json(libro);
        }
    } catch (error) {
        next(error);
    }
};

export const obtenerLibrosPorEditorial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const libros = await libroService.obtenerLibrosPorEditorial(req.params.id);
        if (!libros || libros.length === 0) {
            res.status(404).json({ error: "No se encontraron libros para esta editorial" });
        } else {
            res.json(libros);
        }
    } catch (error) {
        next(error);
    }
};

export const obtenerLibrosPorAutor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const libros = await libroService.obtenerLibrosPorAutor(req.params.id);
        if (!libros || libros.length === 0) {
            res.status(404).json({ error: "No se encontraron libros para este autor" });
        } else {
            res.json(libros);
        }
    }
    catch (error) {
        next(error);
    }
};

export const obtenerLibrosPorCategoria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const libros = await libroService.obtenerLibrosPorCategoria(req.params.id);
        if (!libros || libros.length === 0) {
            res.status(404).json({ error: "No se encontraron libros para esta categoría" });
        } else {
            res.json(libros);
        }
    } catch (error) {
        next(error);
    }
};


export const actualizarLibro = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const libro = await libroService.actualizarLibro(req.params.id, req.body);
        if (!libro) {
            res.status(404).json({ error: "Libro no encontrado" });
        } else {
            res.json(libro);
        }
    } catch (error) {
        next(error);
    }
};

export const eliminarLibro = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const libro = await libroService.eliminarLibro(req.params.id);
        if (!libro) {
            res.status(404).json({ error: "Libro no encontrado" });
        } else {
            res.json({ mensaje: "Libro eliminado" });
        }
    } catch (error) {
        next(error);
    }
};
