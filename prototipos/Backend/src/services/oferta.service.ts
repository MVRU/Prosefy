import { OfertaRepository } from '../repositories/oferta.repository';

export const OfertaService = {
    crearOferta: OfertaRepository.create,
    obtenerOfertas: OfertaRepository.findAll,
    obtenerOfertaPorId: OfertaRepository.findById,
    actualizarOferta: OfertaRepository.update,
    eliminarOferta: OfertaRepository.delete
};
