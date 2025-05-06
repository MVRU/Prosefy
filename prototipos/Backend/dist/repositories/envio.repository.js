"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvioRepository = void 0;
const envio_model_1 = require("../models/envio.model");
exports.EnvioRepository = {
    crear: (data) => envio_model_1.EnvioModel.create(data),
    obtenerTodos: () => envio_model_1.EnvioModel.find(),
    obtenerPorId: (id) => envio_model_1.EnvioModel.findById(id),
    actualizar: (id, data) => envio_model_1.EnvioModel.findByIdAndUpdate(id, data, { new: true }),
    eliminar: (id) => envio_model_1.EnvioModel.findByIdAndDelete(id)
};
