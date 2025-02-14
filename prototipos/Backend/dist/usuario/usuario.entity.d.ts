import { Document } from 'mongoose';
export declare class Usuario extends Document {
    username: string;
    nombre: string;
    apellido: string;
    email: string;
    direccion: string;
    localidad: string;
    avatar: string;
    tipo: string;
    contraseña: string;
}
export declare const UsuarioSchema: import("mongoose").Schema<Usuario, import("mongoose").Model<Usuario, any, any, any, Document<unknown, any, Usuario> & Usuario & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Usuario, Document<unknown, {}, import("mongoose").FlatRecord<Usuario>> & import("mongoose").FlatRecord<Usuario> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
