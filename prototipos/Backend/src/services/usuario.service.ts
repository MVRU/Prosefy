import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsuarioRepositorio } from '../repositories/usuario.repository';
import { IUsuario } from '../models/usuario.model';

const JWT_SECRET = process.env.JWT_SECRET || 'secreto123';

export const UsuarioServicio = {
    async registrar(datos: any): Promise<IUsuario> {
        const existe = await UsuarioRepositorio.encontrarPorEmail(datos.email);
        if (existe) throw new Error('El correo electrónico ya está registrado');

        const hash = await bcrypt.hash(datos.password, 10);

        return UsuarioRepositorio.crear({
            ...datos,
            password_hash: hash,
            tokens: []
        });
    },

    async iniciarSesion(email: string, password: string) {
        const usuario = await UsuarioRepositorio.encontrarPorEmail(email);
        if (!usuario) throw new Error('Credenciales inválidas');

        const valido = await bcrypt.compare(password, usuario.password_hash);
        if (!valido) throw new Error('Credenciales inválidas');

        const token = jwt.sign({ id: usuario._id }, JWT_SECRET, { expiresIn: '1d' });

        usuario.tokens.push({ token, fecha_expiracion: new Date(Date.now() + 86400000) });
        await usuario.save();

        return { token, usuario };
    },

    async obtenerPerfil(id: string) {
        return UsuarioRepositorio.encontrarPorId(id);
    }
};
