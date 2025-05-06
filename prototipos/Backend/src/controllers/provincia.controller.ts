import { Request, Response, NextFunction } from "express";
import provinciaService from "../services/provincia.service";

export const crearProvincia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const nuevaProvincia = await provinciaService.crearProvincia(req.body.descripcion);
        res.status(201).json(nuevaProvincia);
    } catch (error) {
        next(error);
    }
};

export const obtenerProvincias = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const provincias = await provinciaService.obtenerProvincias();
        res.json(provincias);
    } catch (error) {
        next(error);
    }
};

export const actualizarProvincia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const provinciaActualizada = await provinciaService.actualizarProvincia(req.params.id, req.body);
        if (!provinciaActualizada) {
            res.status(404).json({ error: "Provincia no encontrada" });
        } else {
            res.json(provinciaActualizada);
        }
    } catch (error) {
        next(error);
    }
};

export const eliminarProvincia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const provinciaEliminada = await provinciaService.eliminarProvincia(req.params.id);
        if (!provinciaEliminada) {
            res.status(404).json({ error: "Provincia no encontrada" });
        } else {
            res.json({ mensaje: "Provincia eliminada" });
        }
    } catch (error) {
        next(error);
    }
};
