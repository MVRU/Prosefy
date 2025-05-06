import { Request, Response, NextFunction } from 'express';
import ListaDeseosService from '../services/listadeseos.service';

class ListaDeseosController {
    // Agregar un libro a la lista de deseos
    public async agregarLibroALista(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { usuarioId, libroId } = req.body;
        try {
            await ListaDeseosService.agregarLibroALista(usuarioId, libroId);
            res.status(201).json({ message: 'Libro agregado a la lista de deseos' });
        } catch (error) {
            next(error);
        }
    }

    // Eliminar un libro de la lista de deseos
    public async eliminarLibroDeLista(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { usuarioId, libroId } = req.params;
        try {
            await ListaDeseosService.eliminarLibroDeLista(usuarioId, libroId);
            res.status(200).json({ message: 'Libro eliminado de la lista de deseos' });
        } catch (error) {
            next(error);
        }
    }

    // Obtener la lista de deseos de un usuario
    public async obtenerListaDeseos(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { usuarioId } = req.params;
        try {
            const listaDeseos = await ListaDeseosService.obtenerListaDeseos(usuarioId);
            res.status(200).json(listaDeseos);
        } catch (error) {
            next(error);
        }
    }
}

export default new ListaDeseosController();