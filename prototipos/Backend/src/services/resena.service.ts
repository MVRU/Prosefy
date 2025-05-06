import { ResenaRepository } from '../repositories/resena.repository';

export const ResenaService = {
    crearResena: ResenaRepository.create,
    obtenerResenas: ResenaRepository.findAll,
    obtenerResenaPorId: ResenaRepository.findById,
    actualizarResena: ResenaRepository.update,
    eliminarResena: ResenaRepository.delete
};
