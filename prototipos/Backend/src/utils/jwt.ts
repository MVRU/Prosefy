import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secreto123';
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno');
}

const EXPIRACION = '1d'; // 1 día

type CustomJwtPayload = {
    id: string;
    rol?: string;
} & JwtPayload;

export const JwtUtil = {
    generarToken: (
        payload: { id: string; rol?: string }
    ): string => {
        const options: SignOptions = {
            algorithm: 'HS256',
        };

        return jwt.sign(payload, JWT_SECRET, options);
    },

    verificarToken: (token: string): any => {
        try {
            return jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
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

    obtenerFechaExpiracion: (): Date => {
        return new Date(Date.now() + 24 * 60 * 60 * 1000);
    }
};
