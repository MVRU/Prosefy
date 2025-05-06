import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const middlewareAutenticacion = (req: Request, res: Response, next: NextFunction): void => {
    const cabeceraAutorizacion = req.headers.authorization;

    // Si no hay cabecera de autorización, enviamos la respuesta sin retornar
    if (!cabeceraAutorizacion) {
        res.status(401).json({ error: 'Token no proporcionado' });
        return;
    }

    const token = cabeceraAutorizacion.split(' ')[1];

    try {
        // Verificamos el token y lo decodificamos
        const decodificado = jwt.verify(token, process.env.JWT_SECRET || 'secreto123') as any;
        (req as any).userId = decodificado.id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido o expirado' });
    }
};
