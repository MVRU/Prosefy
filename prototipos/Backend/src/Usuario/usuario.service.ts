import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
    constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>) { }

    async crear(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        const hashedPassword = await bcrypt.hash(createUsuarioDto.contraseña, 10);
        const nuevoUsuario = new this.usuarioModel({
            ...createUsuarioDto,
            contraseña: hashedPassword,
        });
        return nuevoUsuario.save();
    }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        return this.usuarioModel.findOne({ email }).exec();
    }

    async findAll(): Promise<Usuario[]> {
        return this.usuarioModel.find().exec();
    }
}