import { Request, Response, NextFunction } from 'express';
import { JwtUtil } from '../utils/jwt';
import UsuarioModel from '../models/usuario.model';

export const authGuard = (roles: string[] = []) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const auth = req.headers.authorization;
            if (!auth) {
                res.status(401).json({ error: 'Token no proporcionado' });
                return;
            }

            const parts = auth.split(' ');
            if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
                res.status(401).json({ error: 'Formato de token inválido' });
                return;
            }

            const token = parts[1];

            const payload = JwtUtil.verificarToken(token);

            const usuario = await UsuarioModel.findById(payload.id);
            if (!usuario || !usuario.tokens.find(t => t.token === token)) {
                res.status(401).json({ error: 'Token inválido o no registrado' });
                return;
            }

            if (roles.length && !roles.includes(payload.rol)) {
                res.status(403).json({ error: 'No tienes permisos para acceder a esta ruta' });
                return;
            }

            req.userId = payload.id;
            req.userRol = payload.rol;
            next();
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    };
};