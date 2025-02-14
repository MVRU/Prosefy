import { Model } from 'mongoose';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
export declare class UsuarioService {
    private usuarioModel;
    constructor(usuarioModel: Model<Usuario>);
    crear(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    buscarPorEmail(email: string): Promise<Usuario | null>;
    findAll(): Promise<Usuario[]>;
}
