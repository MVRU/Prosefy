// pedido.interface.ts

import { ItemPedido } from './ItemPedido.interface';
import { UsuarioNew } from '../models/usuario.interface';
import { Envio } from '../models/envio.interface';

export interface Pedido {
    _id?: string;
    usuario: UsuarioNew;
    items: ItemPedido[];
    metodo_pago: MetodoPago;
    estado: 'pendiente' | 'procesado' | 'enviado' | 'entregado';
    total: number;
    envio: number;
    fecha_hora?: Date;
}

export enum MetodoPago {
    Debito = 'debito',
    Transferencia = 'transferencia',
    Efectivo = 'efectivo',
    Tarjeta = 'tarjeta'
}