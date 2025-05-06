import { EditorialModel } from "../models/editorial.model";

export const EditorialRepositorio = {
    crear: (datos: any) => EditorialModel.create(datos),
    obtenerTodos: () => EditorialModel.find(),
    obtenerPorId: (id: string) => EditorialModel.findById(id),
    actualizar: (id: string, datos: any) => EditorialModel.findByIdAndUpdate(id, datos, { new: true }),
    eliminar: (id: string) => EditorialModel.findByIdAndDelete(id),
};
