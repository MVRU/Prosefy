import Resena from '../models/resena.model';

export const ResenaRepository = {
    create: (datos: any) => Resena.create(datos),
    findAll: () => Resena.find().populate('usuario libro'),
    findById: (id: string) => Resena.findById(id).populate('usuario libro'),
    update: (id: string, datos: any) => Resena.findByIdAndUpdate(id, datos, { new: true }),
    delete: (id: string) => Resena.findByIdAndDelete(id)
};
