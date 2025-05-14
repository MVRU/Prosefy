import { Autor } from './autor.interface';
import { Categoria } from './categoria.interface';
import { Editorial } from './editorial.interface';

export interface Libro {
    _id: string;
    isbn: string;
    titulo: string;
    idioma: string;
    descripcion: string;
    precio: number;
    calificacion: number;
    fecha_edicion: Date;
    portada: string;
    formatos: string[];  // "fisico", "digital", "audiolibro"
    autores: Autor[];    // Relación con autores
    categorias: Categoria[];  // Relación con categorías
    editorial: Editorial;  // Relación con editorial
    createdAt?: Date;
    updatedAt?: Date;
}