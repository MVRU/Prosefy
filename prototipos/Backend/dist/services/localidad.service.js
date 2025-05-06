"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalidadService = void 0;
const localidad_repository_1 = require("../repositories/localidad.repository");
exports.LocalidadService = {
    crearLocalidad: localidad_repository_1.LocalidadRepository.create,
    obtenerLocalidades: localidad_repository_1.LocalidadRepository.findAll,
    obtenerLocalidadPorId: localidad_repository_1.LocalidadRepository.findById,
    actualizarLocalidad: localidad_repository_1.LocalidadRepository.update,
    eliminarLocalidad: localidad_repository_1.LocalidadRepository.delete
};
