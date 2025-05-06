"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutorRepositorio = void 0;
const autor_model_1 = require("../models/autor.model");
exports.AutorRepositorio = {
    crear: (datos) => autor_model_1.AutorModel.create(datos),
    obtenerTodos: () => autor_model_1.AutorModel.find(),
    obtenerPorId: (id) => autor_model_1.AutorModel.findById(id),
    actualizar: (id, datos) => autor_model_1.AutorModel.findByIdAndUpdate(id, datos, { new: true }),
    eliminar: (id) => autor_model_1.AutorModel.findByIdAndDelete(id),
};
