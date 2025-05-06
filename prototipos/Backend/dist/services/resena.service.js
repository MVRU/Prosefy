"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResenaService = void 0;
const resena_repository_1 = require("../repositories/resena.repository");
exports.ResenaService = {
    crearResena: resena_repository_1.ResenaRepository.create,
    obtenerResenas: resena_repository_1.ResenaRepository.findAll,
    obtenerResenaPorId: resena_repository_1.ResenaRepository.findById,
    actualizarResena: resena_repository_1.ResenaRepository.update,
    eliminarResena: resena_repository_1.ResenaRepository.delete
};
