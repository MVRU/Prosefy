import { Provincia } from './provincia.interface';
export interface UsuarioNew {
    _id?: string;
    username: string;
    nombre: string;
    apellido: string;
    email: string;
    password?: string;
    rol?: 'admin' | 'cliente';
    direccion?: string;
    codigo_postal?: string;
    provincia?: Provincia;
    avatar?: string;
    tokens?: any[];
    createdAt?: Date;
    updatedAt?: Date;
}