import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
export declare class AuthService {
    private usuarioService;
    private jwtService;
    constructor(usuarioService: UsuarioService, jwtService: JwtService);
    validateUser(email: string, contraseña: string): Promise<any>;
    login(user: any, res: any): Promise<{
        message: string;
    }>;
    logout(res: any): Promise<{
        message: string;
    }>;
}
