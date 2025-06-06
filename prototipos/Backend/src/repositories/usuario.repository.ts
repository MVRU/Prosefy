import UsuarioModel, { IUsuario } from '../models/usuario.model';

export const UsuarioRepositorio = {
    async encontrarPorEmail(email: string): Promise<IUsuario | null> {
        return UsuarioModel.findOne({ email });
    },

    async encontrarPorId(id: string): Promise<IUsuario | null> {
        return UsuarioModel.findById(id);
    },

    async encontrarPorUsername(username: string): Promise<IUsuario | null> {
        return UsuarioModel.findOne({ username });
    },

    async crear(datosUsuario: Partial<IUsuario>): Promise<IUsuario> {
        const usuario = new UsuarioModel(datosUsuario);
        return usuario.save();
    },

    async actualizar(id: string, actualizaciones: Partial<IUsuario>) {
        return UsuarioModel.findByIdAndUpdate(id, actualizaciones, { new: true });
    },

    async eliminar(id: string): Promise<IUsuario | null> {
        return await UsuarioModel.findByIdAndDelete(id);
    },

    async encontrarTodos(): Promise<IUsuario[]> {
        return await UsuarioModel.find().select('-password_hash -tokens');
    }
};