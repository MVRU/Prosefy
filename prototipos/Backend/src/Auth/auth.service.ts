import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, contraseña: string): Promise<any> {
        const user = await this.usuarioService.buscarPorEmail(email);
        if (user && (await bcrypt.compare(contraseña, user.contraseña))) {
            const { contraseña, ...result } = user.toObject();
            return result;
        }
        return null;
    }

    async login(user: any, res: any) {
        const payload = { email: user.email, sub: user._id, tipo: user.tipo };
        const token = this.jwtService.sign(payload);

        // Guardar el token en una cookie HTTP-only
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return { message: 'Login successful' };
    }

    async logout(res: any) {
        // Eliminar la cookie del token
        res.clearCookie('access_token');
        return { message: 'Logout successful' };
    }
}