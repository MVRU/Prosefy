import CategoriaRepository from '../repositories/categoria.repository';

class CategoriaService {

    // Crear una nueva categoría
    async crearCategoria(nombre: string) {
        const categoriaExistente = await CategoriaRepository.obtenerCategoriaPorNombre(nombre);
        if (categoriaExistente) throw new Error('La categoría ya existe');
        return CategoriaRepository.crearCategoria(nombre);
    }

    // Obtener todas las categorías
    async obtenerCategorias() {
        return CategoriaRepository.obtenerCategorias();
    }

    // Actualizar una categoría
    async actualizarCategoria(id: string, nombre: string) {
        return CategoriaRepository.actualizarCategoria(id, nombre);
    }

    // Eliminar una categoría
    async eliminarCategoria(id: string) {
        return CategoriaRepository.eliminarCategoria(id);
    }
}

export default new CategoriaService();
