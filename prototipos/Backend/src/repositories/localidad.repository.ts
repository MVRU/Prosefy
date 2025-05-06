import Localidad from '../models/localidad.model';

export const LocalidadRepository = {
    create: (datos: any) => Localidad.create(datos),
    findAll: () => Localidad.find().populate('provincia'),
    findById: (id: string) => Localidad.findById(id).populate('provincia'),
    update: (id: string, datos: any) => Localidad.findByIdAndUpdate(id, datos, { new: true }),
    delete: (id: string) => Localidad.findByIdAndDelete(id)
};