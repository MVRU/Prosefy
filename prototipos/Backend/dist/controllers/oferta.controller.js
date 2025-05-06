"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfertaController = void 0;
const oferta_service_1 = require("../services/oferta.service");
exports.OfertaController = {
    crear: async (req, res, next) => {
        try {
            const oferta = await oferta_service_1.OfertaService.crearOferta(req.body);
            res.status(201).json(oferta);
        }
        catch (error) {
            next(error);
        }
    },
    listar: async (req, res, next) => {
        try {
            const ofertas = await oferta_service_1.OfertaService.obtenerOfertas();
            res.json(ofertas);
        }
        catch (error) {
            next(error);
        }
    },
    obtener: async (req, res, next) => {
        try {
            const oferta = await oferta_service_1.OfertaService.obtenerOfertaPorId(req.params.id);
            if (!oferta)
                res.status(404).json({ msg: 'No encontrada' });
            res.json(oferta);
        }
        catch (error) {
            next(error);
        }
    },
    actualizar: async (req, res, next) => {
        try {
            const actualizada = await oferta_service_1.OfertaService.actualizarOferta(req.params.id, req.body);
            res.json(actualizada);
        }
        catch (error) {
            next(error);
        }
    },
    eliminar: async (req, res, next) => {
        try {
            await oferta_service_1.OfertaService.eliminarOferta(req.params.id);
            res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    }
};
