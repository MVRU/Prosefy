import { Request, Response, NextFunction } from 'express';
import { UsuarioServicio } from '../services/usuario.service';

export const UsuarioControlador = {

    async registrar(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = await UsuarioServicio.registrar(req.body);
            res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario });
        } catch (error: any) {
            let mensaje = 'Error desconocido en el registro';

            if (error.code === 11000) {
                // MongoDB duplicate key error
                if (error.keyPattern && error.keyValue) {
                    const campo = Object.keys(error.keyPattern)[0];
                    mensaje = campo === 'email'
                        ? 'El correo electrónico ya está registrado.'
                        : campo === 'username'
                            ? 'El nombre de usuario ya está en uso.'
                            : 'Ya existe un registro con ese valor.';
                } else {
                    mensaje = 'Este valor ya está en uso.';
                }
            } else if (error.message.includes('correo')) {
                mensaje = 'El correo electrónico ya está registrado.';
            } else if (error.message.includes('username')) {
                mensaje = 'El nombre de usuario ya está en uso.';
            } else if (error.message) {
                mensaje = error.message;
            }

            res.status(400).json({ mensaje });
        }
    },

    async iniciarSesion(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const datos = await UsuarioServicio.iniciarSesion(email, password);
            res.json(datos);
        } catch (error) {
            next(error);
        }
    },

    async cerrarSesion(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(400).json({ error: 'Token no proporcionado' });
            }

            await UsuarioServicio.cerrarSesion((req as any).userId, token);
            res.json({ mensaje: 'Sesión cerrada correctamente' });
        } catch (error) {
            next(error);
        }
    },

    async perfil(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = await UsuarioServicio.obtenerPerfil((req as any).userId);
            res.json(usuario);
        } catch (error) {
            next(error);
        }
    }
};