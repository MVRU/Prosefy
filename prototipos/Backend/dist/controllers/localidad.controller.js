"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalidadController = void 0;
const localidad_service_1 = require("../services/localidad.service");
exports.LocalidadController = {
    crear: async (req, res, next) => {
        try {
            const localidad = await localidad_service_1.LocalidadService.crearLocalidad(req.body);
            res.status(201).json(localidad);
        }
        catch (error) {
            next(error);
        }
    },
    listar: async (req, res, next) => {
        try {
            const localidades = await localidad_service_1.LocalidadService.obtenerLocalidades();
            res.json(localidades);
        }
        catch (error) {
            next(error);
        }
    },
    obtener: async (req, res, next) => {
        try {
            const localidad = await localidad_service_1.LocalidadService.obtenerLocalidadPorId(req.params.id);
            if (!localidad)
                res.status(404).json({ msg: 'No encontrada' });
            res.json(localidad);
        }
        catch (error) {
            next(error);
        }
    },
    actualizar: async (req, res, next) => {
        try {
            const actualizada = await localidad_service_1.LocalidadService.actualizarLocalidad(req.params.id, req.body);
            res.json(actualizada);
        }
        catch (error) {
            next(error);
        }
    },
    eliminar: async (req, res, next) => {
        try {
            await localidad_service_1.LocalidadService.eliminarLocalidad(req.params.id);
            res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    }
};
