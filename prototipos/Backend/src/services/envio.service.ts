import { EnvioRepository } from '../repositories/envio.repository';

export const EnvioService = {
    crearEnvio: EnvioRepository.crear,
    obtenerEnvios: EnvioRepository.obtenerTodos,
    obtenerEnvioPorId: EnvioRepository.obtenerPorId,
    actualizarEnvio: EnvioRepository.actualizar,
    eliminarEnvio: EnvioRepository.eliminar
};
