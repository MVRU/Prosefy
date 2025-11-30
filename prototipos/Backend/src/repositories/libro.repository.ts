import { ILibro, Libro } from "../models/libro.model";

export const LibroRepository = {
    crear: (data: Partial<ILibro>) => Libro.create(data),

    obtenerTodos: () =>
        Libro.find().populate("autores categorias editorial"),

    obtenerPorId: (id: string) =>
        Libro.findById(id).populate("autores categorias editorial"),

    obtenerPorEditorial: (id: string) =>
        Libro.find({ editorial: id }).populate("autores categorias editorial"),

    obtenerPorAutor: (id: string) =>
        Libro.find({ autores: id }).populate("autores categorias editorial"),

    obtenerPorCategoria: (id: string) =>
        Libro.find({ categorias: id }).populate("autores categorias editorial"),

    actualizar: (id: string, data: Partial<ILibro>) =>
        Libro.findByIdAndUpdate(id, data, { new: true }).populate("autores categorias editorial"),

    eliminar: (id: string) =>
        Libro.findByIdAndDelete(id),
};