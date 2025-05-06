"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutorServicio = void 0;
const autor_repository_1 = require("../repositories/autor.repository");
exports.AutorServicio = {
    crearAutor: (datos) => autor_repository_1.AutorRepositorio.crear(datos),
    obtenerAutores: () => autor_repository_1.AutorRepositorio.obtenerTodos(),
    obtenerAutorPorId: (id) => autor_repository_1.AutorRepositorio.obtenerPorId(id),
    actualizarAutor: (id, datos) => autor_repository_1.AutorRepositorio.actualizar(id, datos),
    eliminarAutor: (id) => autor_repository_1.AutorRepositorio.eliminar(id),
};
