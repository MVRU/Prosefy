"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorialServicio = void 0;
const editorial_repository_1 = require("../repositories/editorial.repository");
exports.EditorialServicio = {
    crearEditorial: (datos) => editorial_repository_1.EditorialRepositorio.crear(datos),
    obtenerEditoriales: () => editorial_repository_1.EditorialRepositorio.obtenerTodos(),
    obtenerEditorialPorId: (id) => editorial_repository_1.EditorialRepositorio.obtenerPorId(id),
    actualizarEditorial: (id, datos) => editorial_repository_1.EditorialRepositorio.actualizar(id, datos),
    eliminarEditorial: (id) => editorial_repository_1.EditorialRepositorio.eliminar(id),
};
