import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Post('registro')
    async registrar(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuarioService.crear(createUsuarioDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'), new RolesGuard(['admin']))
    async findAll() {
        return this.usuarioService.findAll();
    }
}