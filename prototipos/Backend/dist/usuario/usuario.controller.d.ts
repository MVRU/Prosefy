import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    registrar(createUsuarioDto: CreateUsuarioDto): Promise<import("./usuario.entity").Usuario>;
    findAll(): Promise<import("./usuario.entity").Usuario[]>;
}
