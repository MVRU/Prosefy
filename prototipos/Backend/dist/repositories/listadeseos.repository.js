"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listadeseos_model_1 = __importDefault(require("../models/listadeseos.model"));
class ListaDeseosRepository {
    // Crear una entrada en la lista de deseos
    async crearListaDeseos(usuarioId, libroId) {
        const listaDeseos = new listadeseos_model_1.default({ usuario: usuarioId, libro: libroId });
        return await listaDeseos.save();
    }
    // Eliminar una entrada de la lista de deseos
    async eliminarListaDeseos(usuarioId, libroId) {
        await listadeseos_model_1.default.deleteOne({ usuario: usuarioId, libro: libroId });
    }
    // Obtener lista de deseos de un usuario
    async obtenerListaDeseos(usuarioId) {
        return await listadeseos_model_1.default.find({ usuario: usuarioId }).populate('libro');
    }
}
exports.default = new ListaDeseosRepository();
