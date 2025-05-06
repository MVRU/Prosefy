import { EnvioModel } from '../models/envio.model';

export const EnvioRepository = {
    crear: (data: any) => EnvioModel.create(data),
    obtenerTodos: () => EnvioModel.find(),
    obtenerPorId: (id: string) => EnvioModel.findById(id),
    actualizar: (id: string, data: any) => EnvioModel.findByIdAndUpdate(id, data, { new: true }),
    eliminar: (id: string) => EnvioModel.findByIdAndDelete(id)
};
