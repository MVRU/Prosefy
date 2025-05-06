import { Libro } from "../models/libro.model";
import { ILibro } from "../models/libro.model";

export const crearLibro = async (data: Partial<ILibro>) => {
    const nuevoLibro = new Libro(data);
    return await nuevoLibro.save();
};

export const obtenerLibros = async () => {
    return await Libro.find().populate("autores categorias editorial");
};

export const obtenerLibroPorId = async (id: string) => {
    return await Libro.findById(id).populate("autores categorias editorial");
};

export const actualizarLibro = async (id: string, data: Partial<ILibro>) => {
    return await Libro.findByIdAndUpdate(id, data, { new: true });
};

export const eliminarLibro = async (id: string) => {
    return await Libro.findByIdAndDelete(id);
};
