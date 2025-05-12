import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secreto123';

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido');
}

type CustomJwtPayload = {
    id: string;
    rol?: string;
} & JwtPayload;

export const JwtUtil = {
    // Genera token firmado
    generarToken: (payload: { id: string; rol: string }): string => {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: '1d',
        });
    },

    // Verifica un token válido
    verificarToken: (token: string): { id: string; rol: string } => {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
            if (!decoded.id || !decoded.rol) {
                throw new Error('Token incompleto');
            }
            return { id: decoded.id, rol: decoded.rol };
        } catch (error: any) {
            if (error.name === 'JsonWebTokenError') {
                throw new Error('Token inválido');
            }
            if (error.name === 'TokenExpiredError') {
                throw new Error('Token expirado');
            }
            throw new Error('Error al verificar el token');
        }
    },

    // Devuelve la fecha de expiración del token
    obtenerFechaExpiracion(): Date {
        return new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 día
    }
};