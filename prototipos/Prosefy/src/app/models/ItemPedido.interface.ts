import { Libro } from './libro.interface';
export interface ItemPedido {
    libro: string;
    cantidad: number;
    precio_unitario: number;
}