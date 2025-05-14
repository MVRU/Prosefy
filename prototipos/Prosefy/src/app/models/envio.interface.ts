export interface Envio {
    _id?: string;
    precio: number;
    fecha_entrega_estimada?: Date;
    fecha_entrega_real?: Date;
    envio_gratis: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}