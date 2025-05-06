"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfertaService = void 0;
const oferta_repository_1 = require("../repositories/oferta.repository");
exports.OfertaService = {
    crearOferta: oferta_repository_1.OfertaRepository.create,
    obtenerOfertas: oferta_repository_1.OfertaRepository.findAll,
    obtenerOfertaPorId: oferta_repository_1.OfertaRepository.findById,
    actualizarOferta: oferta_repository_1.OfertaRepository.update,
    eliminarOferta: oferta_repository_1.OfertaRepository.delete
};
