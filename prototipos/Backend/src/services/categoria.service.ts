import CategoriaRepository from '../repositories/categoria.repository';

class CategoriaService {

    async crearCategoria(nombre: string) {
        const categoriaExistente = await CategoriaRepository.obtenerCategoriaPorNombre(nombre);
        if (categoriaExistente) throw new Error('La categoría ya existe');
        return CategoriaRepository.crearCategoria(nombre);
    }

    async obtenerCategorias() {
        return CategoriaRepository.obtenerCategorias();
    }

    async actualizarCategoria(id: string, nombre: string) {
        return CategoriaRepository.actualizarCategoria(id, nombre);
    }

    async eliminarCategoria(id: string) {
        return CategoriaRepository.eliminarCategoria(id);
    }
}

export default new CategoriaService();
