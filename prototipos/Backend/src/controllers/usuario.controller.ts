import { Request, Response, NextFunction } from 'express';
import { UsuarioServicio } from '../services/usuario.service';

export const UsuarioControlador = {

    async registrar(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = await UsuarioServicio.registrar(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            next(error);
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