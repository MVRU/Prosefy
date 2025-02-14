import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies['access_token'];
        if (!token) {
            return next();
        }

        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error('JWT_SECRET is not defined');
            }
            const decoded = jwt.verify(token, secret);
            req['user'] = decoded;
        } catch (err) {
            // Ignorar errores de verificación
        }
        next();
    }
}