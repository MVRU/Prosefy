import UsuarioModel, { IUsuario } from '../models/usuario.model';

export const UsuarioRepositorio = {
    async encontrarPorEmail(email: string): Promise<IUsuario | null> {
        return UsuarioModel.findOne({ email });
    },

    async encontrarPorId(id: string): Promise<IUsuario | null> {
        return UsuarioModel.findById(id).populate('lista_deseos');
    },

    async crear(datosUsuario: Partial<IUsuario>): Promise<IUsuario> {
        const usuario = new UsuarioModel(datosUsuario);
        return usuario.save();
    },

    async actualizar(id: string, actualizaciones: Partial<IUsuario>) {
        return UsuarioModel.findByIdAndUpdate(id, actualizaciones, { new: true });
    }
};
