import { PasswordUtil } from '../utils/password';
import { JwtUtil } from '../utils/jwt';
import { UsuarioRepositorio } from '../repositories/usuario.repository';
import { IUsuario } from '../models/usuario.model';

export const UsuarioServicio = {
    async registrar(datos: any): Promise<IUsuario> {
        const existeEmail = await UsuarioRepositorio.encontrarPorEmail(datos.email);
        if (existeEmail) {
            throw new Error('El correo electrónico ya está registrado');
        }

        const existeUsername = await UsuarioRepositorio.encontrarPorUsername(datos.username);
        if (existeUsername) {
            throw new Error('El nombre de usuario ya está en uso');
        }

        const hash = await PasswordUtil.hashPassword(datos.password);

        return UsuarioRepositorio.crear({
            ...datos,
            password_hash: hash,
            tokens: []
        });
    },

    async iniciarSesion(email: string, password: string) {
        const usuario = await UsuarioRepositorio.encontrarPorEmail(email);
        if (!usuario) throw new Error('Credenciales inválidas');

        const valido = await PasswordUtil.comparePasswords(password, usuario.password_hash);
        if (!valido) throw new Error('Credenciales inválidas');

        const token = JwtUtil.generarToken({ id: usuario._id.toString(), rol: usuario.rol });
        const fecha_expiracion = JwtUtil.obtenerFechaExpiracion();

        usuario.tokens.push({ token, fecha_expiracion });
        await usuario.save();

        return { token, usuario };
    },

    async cerrarSesion(idUsuario: string, token: string) {
        const usuario = await UsuarioRepositorio.encontrarPorId(idUsuario);
        if (!usuario) throw new Error('Usuario no encontrado');

        usuario.tokens = usuario.tokens.filter(t => t.token !== token);
        await usuario.save();
    },

    async obtenerPerfil(id: string) {
        return UsuarioRepositorio.encontrarPorId(id);
    }
};
