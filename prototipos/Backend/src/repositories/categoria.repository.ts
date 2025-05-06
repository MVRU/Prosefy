import CategoriaModel from '../models/categoria.model';

class CategoriaRepository {

    // Crear una categoría
    async crearCategoria(nombre: string) {
        const nuevaCategoria = new CategoriaModel({ nombre });
        return nuevaCategoria.save();
    }

    // Obtener todas las categorías
    async obtenerCategorias() {
        return CategoriaModel.find();
    }

    // Obtener una categoría por nombre
    async obtenerCategoriaPorNombre(nombre: string) {
        return CategoriaModel.findOne({ nombre });
    }

    // Actualizar una categoría
    async actualizarCategoria(id: string, nombre: string) {
        return CategoriaModel.findByIdAndUpdate(id, { nombre }, { new: true });
    }

    // Eliminar una categoría
    async eliminarCategoria(id: string) {
        return CategoriaModel.findByIdAndDelete(id);
    }
}

export default new CategoriaRepository();
