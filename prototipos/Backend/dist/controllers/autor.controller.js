"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutorControlador = void 0;
const autor_service_1 = require("../services/autor.service");
exports.AutorControlador = {
    async crear(req, res, next) {
        try {
            const autor = await autor_service_1.AutorServicio.crearAutor(req.body);
            res.status(201).json(autor);
        }
        catch (error) {
            next(error);
        }
    },
    async obtenerTodos(req, res, next) {
        try {
            const autores = await autor_service_1.AutorServicio.obtenerAutores();
            res.json(autores);
        }
        catch (error) {
            next(error);
        }
    },
    async actualizar(req, res, next) {
        try {
            const autor = await autor_service_1.AutorServicio.actualizarAutor(req.params.id, req.body);
            res.json(autor);
        }
        catch (error) {
            next(error);
        }
    },
    async eliminar(req, res, next) {
        try {
            await autor_service_1.AutorServicio.eliminarAutor(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
};
