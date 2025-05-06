import { AutorRepositorio } from "../repositories/autor.repository";

export const AutorServicio = {
    crearAutor: (datos: any) => AutorRepositorio.crear(datos),
    obtenerAutores: () => AutorRepositorio.obtenerTodos(),
    obtenerAutorPorId: (id: string) => AutorRepositorio.obtenerPorId(id),
    actualizarAutor: (id: string, datos: any) => AutorRepositorio.actualizar(id, datos),
    eliminarAutor: (id: string) => AutorRepositorio.eliminar(id),
};
