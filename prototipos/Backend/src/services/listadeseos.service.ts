import ListaDeseosRepository from '../repositories/listadeseos.repository';

class ListaDeseosService {
    // Añadir un libro a la lista de deseos
    public async agregarLibroALista(usuarioId: string, libroId: string): Promise<void> {
        await ListaDeseosRepository.crearListaDeseos(usuarioId, libroId);
    }

    // Eliminar un libro de la lista de deseos
    public async eliminarLibroDeLista(usuarioId: string, libroId: string): Promise<void> {
        await ListaDeseosRepository.eliminarListaDeseos(usuarioId, libroId);
    }

    // Obtener la lista de deseos de un usuario
    public async obtenerListaDeseos(usuarioId: string) {
        return await ListaDeseosRepository.obtenerListaDeseos(usuarioId);
    }
}

export default new ListaDeseosService();
