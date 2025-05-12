import { Libro } from './libro.interface';
export interface ItemPedido {
    libro: Libro | null | undefined;
    cantidad: number;
    precio_unitario: number;
}