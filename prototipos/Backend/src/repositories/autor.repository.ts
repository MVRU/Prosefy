import { AutorModel } from "../models/autor.model";

export const AutorRepositorio = {
    crear: (datos: any) => AutorModel.create(datos),
    obtenerTodos: () => AutorModel.find(),
    obtenerPorId: (id: string) => AutorModel.findById(id),
    actualizar: (id: string, datos: any) => AutorModel.findByIdAndUpdate(id, datos, { new: true }),
    eliminar: (id: string) => AutorModel.findByIdAndDelete(id),
};
