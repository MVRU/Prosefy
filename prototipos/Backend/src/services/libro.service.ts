import { ILibro } from "../models/libro.model";
import { LibroRepository } from "../repositories/libro.repository";

export const crearLibro = async (data: Partial<ILibro>) => {
    return await LibroRepository.crear(data);
};

export const obtenerLibros = async () => {
    return await LibroRepository.obtenerTodos();
};

export const obtenerLibroPorId = async (id: string) => {
    return await LibroRepository.obtenerPorId(id);
};

export const obtenerLibrosPorEditorial = async (id: string) => {
    return await LibroRepository.obtenerPorEditorial(id);
};

export const obtenerLibrosPorAutor = async (id: string) => {
    return await LibroRepository.obtenerPorAutor(id);
};

export const obtenerLibrosPorCategoria = async (id: string) => {
    return await LibroRepository.obtenerPorCategoria(id);
};

export const actualizarLibro = async (id: string, data: Partial<ILibro>) => {
    return await LibroRepository.actualizar(id, data);
};

export const eliminarLibro = async (id: string) => {
    return await LibroRepository.eliminar(id);
};
