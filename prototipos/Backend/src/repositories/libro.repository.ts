import { Libro } from "../models/libro.model";

export const LibroRepository = {
    crear: (data: any) => Libro.create(data),

    obtenerTodos: () =>
        Libro.find().populate("autores categorias editorial"),

    obtenerPorId: (id: string) =>
        Libro.findById(id).populate("autores categorias editorial"),

    actualizar: (id: string, data: any) =>
        Libro.findByIdAndUpdate(id, data, { new: true }),

    eliminar: (id: string) =>
        Libro.findByIdAndDelete(id),
};
