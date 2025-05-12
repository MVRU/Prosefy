
import { ItemPedido } from './ItemPedido.interface';

export interface Pedido {
    _id?: string;
    usuario: string;
    items: ItemPedido[];
    metodo_pago: MetodoPago;
    estado?: 'pendiente' | 'procesado' | 'enviado' | 'entregado';
    total: number;
    envio: number;
    fecha_hora?: string;
}

export enum MetodoPago {
    Debito = 'debito',
    Transferencia = 'transferencia',
    Efectivo = 'efectivo',
    Tarjeta = 'tarjeta'
}