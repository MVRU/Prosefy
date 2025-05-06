import Oferta from '../models/oferta.model';

export const OfertaRepository = {
    create: (datos: any) => Oferta.create(datos),
    findAll: () => Oferta.find().populate('libros'),
    findById: (id: string) => Oferta.findById(id).populate('libros'),
    update: (id: string, datos: any) => Oferta.findByIdAndUpdate(id, datos, { new: true }),
    delete: (id: string) => Oferta.findByIdAndDelete(id)
};
