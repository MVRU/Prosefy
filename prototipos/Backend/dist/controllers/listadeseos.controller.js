"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listadeseos_service_1 = __importDefault(require("../services/listadeseos.service"));
class ListaDeseosController {
    // Agregar un libro a la lista de deseos
    async agregarLibroALista(req, res, next) {
        const { usuarioId, libroId } = req.body;
        try {
            await listadeseos_service_1.default.agregarLibroALista(usuarioId, libroId);
            res.status(201).json({ message: 'Libro agregado a la lista de deseos' });
        }
        catch (error) {
            next(error);
        }
    }
    // Eliminar un libro de la lista de deseos
    async eliminarLibroDeLista(req, res, next) {
        const { usuarioId, libroId } = req.params;
        try {
            await listadeseos_service_1.default.eliminarLibroDeLista(usuarioId, libroId);
            res.status(200).json({ message: 'Libro eliminado de la lista de deseos' });
        }
        catch (error) {
            next(error);
        }
    }
    // Obtener la lista de deseos de un usuario
    async obtenerListaDeseos(req, res, next) {
        const { usuarioId } = req.params;
        try {
            const listaDeseos = await listadeseos_service_1.default.obtenerListaDeseos(usuarioId);
            res.status(200).json(listaDeseos);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new ListaDeseosController();
