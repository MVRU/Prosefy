import CategoriaModel from '../models/categoria.model';

class CategoriaRepository {

    async crearCategoria(nombre: string) {
        const nuevaCategoria = new CategoriaModel({ nombre });
        return nuevaCategoria.save();
    }

    async obtenerCategorias() {
        return CategoriaModel.find();
    }

    async obtenerCategoriaPorNombre(nombre: string) {
        return CategoriaModel.findOne({ nombre });
    }

    async actualizarCategoria(id: string, nombre: string) {
        return CategoriaModel.findByIdAndUpdate(id, { nombre }, { new: true });
    }

    async eliminarCategoria(id: string) {
        return CategoriaModel.findByIdAndDelete(id);
    }
}

export default new CategoriaRepository();
