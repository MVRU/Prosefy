import { EditorialRepositorio } from "../repositories/editorial.repository";

export const EditorialServicio = {
    crearEditorial: (datos: any) => EditorialRepositorio.crear(datos),
    obtenerEditoriales: () => EditorialRepositorio.obtenerTodos(),
    obtenerEditorialPorId: (id: string) => EditorialRepositorio.obtenerPorId(id),
    actualizarEditorial: (id: string, datos: any) => EditorialRepositorio.actualizar(id, datos),
    eliminarEditorial: (id: string) => EditorialRepositorio.eliminar(id),
};
