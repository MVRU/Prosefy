import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Usuario extends Document {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    nombre: string;

    @Prop({ required: true })
    apellido: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: false })
    direccion: string;

    @Prop({ type: String, ref: 'Localidad' })
    localidad: string;

    @Prop({ default: '' }) // URL de la imagen de avatar
    avatar: string;

    @Prop({ default: 'usuario' }) // Rol por defecto
    tipo: string;

    @Prop({ required: true })
    contraseña: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);