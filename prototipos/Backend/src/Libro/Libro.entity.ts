import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Libro extends Document {
    @Prop({ required: true, unique: true })
    isbn: string;

    @Prop({ required: true })
    titulo: string;

    @Prop({ required: true })
    idioma: string;

    @Prop({ required: false })
    descripcion: string;

    @Prop({ required: true, type: Number })
    precio: number;

    @Prop({ required: false, type: Date })
    fecha_edicion: Date;

    @Prop([{ type: String, ref: 'Autor', required: true }])
    autores: string[];

    @Prop({ type: String, ref: 'Editorial', required: true })
    editorial: string;

    @Prop([{ type: String, ref: 'Categoria' }])
    categorias: string[];

    @Prop([{ type: String, ref: 'FormatoLibro', required: true }])
    formatos: string[];

    @Prop({ default: 5, type: Number }) // Calificación inicial por defecto
    calificacion: number;

    @Prop({ required: true }) // URL de la imagen de portada
    portada: string;
}

export const LibroSchema = SchemaFactory.createForClass(Libro);