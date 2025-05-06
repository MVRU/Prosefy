import { Request, Response } from 'express';
import { UsuarioServicio } from '../services/usuario.service';

export const UsuarioControlador = {
    async registrar(req: Request, res: Response) {
        try {
            const usuario = await UsuarioServicio.registrar(req.body);
            res.status(201).json(usuario);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    },

    async iniciarSesion(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const datos = await UsuarioServicio.iniciarSesion(email, password);
            res.json(datos);
        } catch (err: any) {
            res.status(401).json({ error: err.message });
        }
    },

    async perfil(req: Request, res: Response) {
        try {
            const usuario = await UsuarioServicio.obtenerPerfil((req as any).userId);
            res.json(usuario);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
};
