import ListaDeseos from '../models/listadeseos.model';
import { IListaDeseos } from '../models/listadeseos.model';

class ListaDeseosRepository {
    // Crear una entrada en la lista de deseos
    public async crearListaDeseos(usuarioId: string, libroId: string): Promise<IListaDeseos> {
        const listaDeseos = new ListaDeseos({ usuario: usuarioId, libro: libroId });
        return await listaDeseos.save();
    }

    // Eliminar una entrada de la lista de deseos
    public async eliminarListaDeseos(usuarioId: string, libroId: string): Promise<void> {
        await ListaDeseos.deleteOne({ usuario: usuarioId, libro: libroId });
    }

    // Obtener lista de deseos de un usuario
    public async obtenerListaDeseos(usuarioId: string): Promise<IListaDeseos[]> {
        return await ListaDeseos.find({ usuario: usuarioId }).populate('libro');
    }
}

export default new ListaDeseosRepository();
