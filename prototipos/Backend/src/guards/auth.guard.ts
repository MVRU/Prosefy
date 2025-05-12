import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UsuarioModel from '../models/usuario.model';

export const authGuard = (roles: string[] = []) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Leer el token desde las cookies
            const token = req.cookies?.token;

            if (!token) {
                res.status(401).json({ error: 'Token no proporcionado' });
                return;
            }

            // Verificar firma del token
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'secreto123') as { id: string; rol: string };

            // Buscar el usuario y verificar si tiene ese token
            const usuario = await UsuarioModel.findById(payload.id);
            if (!usuario || !usuario.tokens.find(t => t.token === token)) {
                res.status(401).json({ error: 'Token inválido o no registrado' });
                return;
            }

            // Verificar rol
            if (roles.length && !roles.includes(payload.rol)) {
                res.status(403).json({ error: 'No tienes permisos para acceder a esta ruta' });
                return;
            }

            // Adjuntar datos al request
            (req as any).userId = payload.id;
            (req as any).userRol = payload.rol;

            next();
        } catch (error: any) {
            console.error('Error en authGuard:', error.message);
            res.status(401).json({ error: 'Token inválido o expirado' });
        }
    };
};