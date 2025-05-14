import { Libro } from './libro.interface';
export interface ItemPedido {
    libro: Libro;
    cantidad: number;
    precio_unitario: number;
}