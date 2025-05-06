"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listadeseos_repository_1 = __importDefault(require("../repositories/listadeseos.repository"));
class ListaDeseosService {
    // Añadir un libro a la lista de deseos
    async agregarLibroALista(usuarioId, libroId) {
        await listadeseos_repository_1.default.crearListaDeseos(usuarioId, libroId);
    }
    // Eliminar un libro de la lista de deseos
    async eliminarLibroDeLista(usuarioId, libroId) {
        await listadeseos_repository_1.default.eliminarListaDeseos(usuarioId, libroId);
    }
    // Obtener la lista de deseos de un usuario
    async obtenerListaDeseos(usuarioId) {
        return await listadeseos_repository_1.default.obtenerListaDeseos(usuarioId);
    }
}
exports.default = new ListaDeseosService();
