"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorialRepositorio = void 0;
const editorial_model_1 = require("../models/editorial.model");
exports.EditorialRepositorio = {
    crear: (datos) => editorial_model_1.EditorialModel.create(datos),
    obtenerTodos: () => editorial_model_1.EditorialModel.find(),
    obtenerPorId: (id) => editorial_model_1.EditorialModel.findById(id),
    actualizar: (id, datos) => editorial_model_1.EditorialModel.findByIdAndUpdate(id, datos, { new: true }),
    eliminar: (id) => editorial_model_1.EditorialModel.findByIdAndDelete(id),
};
