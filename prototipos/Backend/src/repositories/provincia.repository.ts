import ProvinciaModel from '../models/provincia.model';

class ProvinciaRepository {

    // Crear una provincia
    async crearProvincia(descripcion: string) {
        const nuevaProvincia = new ProvinciaModel({ descripcion });
        return nuevaProvincia.save();
    }

    // Obtener todas las provincias
    async obtenerProvincias() {
        return ProvinciaModel.find();
    }

    // Obtener una provincia por descripción
    async obtenerProvinciaPorDescripcion(descripcion: string) {
        return ProvinciaModel.findOne({ descripcion });
    }

    // Actualizar una provincia
    async actualizarProvincia(id: string, descripcion: string) {
        return ProvinciaModel.findByIdAndUpdate(id, { descripcion }, { new: true });
    }

    // Eliminar una provincia
    async eliminarProvincia(id: string) {
        return ProvinciaModel.findByIdAndDelete(id);
    }
}

export default new ProvinciaRepository();
