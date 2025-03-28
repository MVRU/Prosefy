import { Router } from 'express';
import { findAll, findOne, sanitizeInput, add, remove, update, findByUsuario, findByLibro, getpedidos, getPedidosConDetalles } from './Pedido.controller.js';
export const pedidoRouter = Router();
pedidoRouter.get('/usuarios/:usuarioId', findByUsuario);
pedidoRouter.get('/libros/:libroId', findByLibro);
pedidoRouter.get('/pedidos', getpedidos);
pedidoRouter.get('/detalles', getPedidosConDetalles);
pedidoRouter.get('/', findAll);
pedidoRouter.get('/:id', findOne);
pedidoRouter.post('/', sanitizeInput, add);
pedidoRouter.put('/:id', sanitizeInput, update);
pedidoRouter.patch('/:id', sanitizeInput, update);
pedidoRouter.delete('/:id', remove);
//# sourceMappingURL=Pedido.routes.js.map