import { Document } from 'mongoose';
export declare class Libro extends Document {
    isbn: string;
    titulo: string;
    idioma: string;
    descripcion: string;
    precio: number;
    fecha_edicion: Date;
    autores: string[];
    editorial: string;
    categorias: string[];
    formatos: string[];
    calificacion: number;
    portada: string;
}
export declare const LibroSchema: import("mongoose").Schema<Libro, import("mongoose").Model<Libro, any, any, any, Document<unknown, any, Libro> & Libro & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Libro, Document<unknown, {}, import("mongoose").FlatRecord<Libro>> & import("mongoose").FlatRecord<Libro> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
