"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResenaController = void 0;
const resena_service_1 = require("../services/resena.service");
exports.ResenaController = {
    crear: async (req, res, next) => {
        try {
            const resena = await resena_service_1.ResenaService.crearResena(req.body);
            res.status(201).json(resena);
        }
        catch (error) {
            next(error);
        }
    },
    listar: async (req, res, next) => {
        try {
            const resenas = await resena_service_1.ResenaService.obtenerResenas();
            res.json(resenas);
        }
        catch (error) {
            next(error);
        }
    },
    obtener: async (req, res, next) => {
        try {
            const resena = await resena_service_1.ResenaService.obtenerResenaPorId(req.params.id);
            if (!resena)
                res.status(404).json({ msg: 'No encontrada' });
            res.json(resena);
        }
        catch (error) {
            next(error);
        }
    },
    actualizar: async (req, res, next) => {
        try {
            const actualizada = await resena_service_1.ResenaService.actualizarResena(req.params.id, req.body);
            res.json(actualizada);
        }
        catch (error) {
            next(error);
        }
    },
    eliminar: async (req, res, next) => {
        try {
            await resena_service_1.ResenaService.eliminarResena(req.params.id);
            res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    }
};
