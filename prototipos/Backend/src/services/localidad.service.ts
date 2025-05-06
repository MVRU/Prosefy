import { LocalidadRepository } from '../repositories/localidad.repository';

export const LocalidadService = {
    crearLocalidad: LocalidadRepository.create,
    obtenerLocalidades: LocalidadRepository.findAll,
    obtenerLocalidadPorId: LocalidadRepository.findById,
    actualizarLocalidad: LocalidadRepository.update,
    eliminarLocalidad: LocalidadRepository.delete
};
