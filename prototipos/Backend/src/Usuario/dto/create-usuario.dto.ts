import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUsuarioDto {
    @IsString()
    username: string;

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    direccion: string;

    @IsOptional()
    @IsString()
    localidad?: string;

    @IsOptional()
    @IsString()
    avatar?: string;

    @MinLength(6)
    contraseña: string;
}