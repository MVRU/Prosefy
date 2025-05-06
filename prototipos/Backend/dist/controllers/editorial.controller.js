"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorialControlador = void 0;
const editorial_service_1 = require("../services/editorial.service");
exports.EditorialControlador = {
    async crear(req, res, next) {
        try {
            const editorial = await editorial_service_1.EditorialServicio.crearEditorial(req.body);
            res.status(201).json(editorial);
        }
        catch (error) {
            next(error);
        }
    },
    async obtenerTodos(req, res, next) {
        try {
            const editoriales = await editorial_service_1.EditorialServicio.obtenerEditoriales();
            res.json(editoriales);
        }
        catch (error) {
            next(error);
        }
    },
    async actualizar(req, res, next) {
        try {
            const editorial = await editorial_service_1.EditorialServicio.actualizarEditorial(req.params.id, req.body);
            res.json(editorial);
        }
        catch (error) {
            next(error);
        }
    },
    async eliminar(req, res, next) {
        try {
            await editorial_service_1.EditorialServicio.eliminarEditorial(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
};
