import ProvinciaRepository from '../repositories/provincia.repository';

class ProvinciaService {

    // Crear una nueva provincia
    async crearProvincia(descripcion: string) {
        const provinciaExistente = await ProvinciaRepository.obtenerProvinciaPorDescripcion(descripcion);
        if (provinciaExistente) throw new Error('La provincia ya existe');
        return ProvinciaRepository.crearProvincia(descripcion);
    }

    // Obtener todas las provincias
    async obtenerProvincias() {
        return ProvinciaRepository.obtenerProvincias();
    }

    // Actualizar una provincia
    async actualizarProvincia(id: string, descripcion: string) {
        return ProvinciaRepository.actualizarProvincia(id, descripcion);
    }

    // Eliminar una provincia
    async eliminarProvincia(id: string) {
        return ProvinciaRepository.eliminarProvincia(id);
    }
}

export default new ProvinciaService();
