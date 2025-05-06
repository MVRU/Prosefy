"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvioService = void 0;
const envio_repository_1 = require("../repositories/envio.repository");
exports.EnvioService = {
    crearEnvio: envio_repository_1.EnvioRepository.crear,
    obtenerEnvios: envio_repository_1.EnvioRepository.obtenerTodos,
    obtenerEnvioPorId: envio_repository_1.EnvioRepository.obtenerPorId,
    actualizarEnvio: envio_repository_1.EnvioRepository.actualizar,
    eliminarEnvio: envio_repository_1.EnvioRepository.eliminar
};
