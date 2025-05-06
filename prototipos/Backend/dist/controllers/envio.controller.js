"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvioController = void 0;
const envio_service_1 = require("../services/envio.service");
exports.EnvioController = {
    crear: async (req, res, next) => {
        try {
            const envio = await envio_service_1.EnvioService.crearEnvio(req.body);
            res.status(201).json(envio);
        }
        catch (error) {
            next(error);
        }
    },
    listar: async (req, res, next) => {
        try {
            const envios = await envio_service_1.EnvioService.obtenerEnvios();
            res.json(envios);
        }
        catch (error) {
            next(error);
        }
    },
    obtener: async (req, res, next) => {
        try {
            const envio = await envio_service_1.EnvioService.obtenerEnvioPorId(req.params.id);
            if (!envio)
                res.status(404).json({ msg: 'No encontrado' });
            res.json(envio);
        }
        catch (error) {
            next(error);
        }
    },
    actualizar: async (req, res, next) => {
        try {
            const actualizado = await envio_service_1.EnvioService.actualizarEnvio(req.params.id, req.body);
            res.json(actualizado);
        }
        catch (error) {
            next(error);
        }
    },
    eliminar: async (req, res, next) => {
        try {
            await envio_service_1.EnvioService.eliminarEnvio(req.params.id);
            res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    }
};
