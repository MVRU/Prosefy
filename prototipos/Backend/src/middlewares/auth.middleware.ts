import { Request, Response, NextFunction } from 'express';
import { JwtUtil } from '../utils/jwt';
import UsuarioModel from '../models/usuario.model';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            userRol?: string;
        }
    }
}

export const middlewareAutenticacion = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ error: 'Token no proporcionado' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const payload = JwtUtil.verificarToken(token);

        const usuario = await UsuarioModel.findById(payload.id);
        if (!usuario || !usuario.tokens.find(t => t.token === token)) {
            res.status(401).json({ error: 'Token inválido o no registrado' });
            return;
        }

        req.userId = payload.id;
        req.userRol = payload.rol;
        next();
    } catch (error: any) {
        console.error('Error en middleware de autenticación:', error.message);
        res.status(401).json({ error: error.message });
    }
};