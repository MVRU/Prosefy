import { Router } from 'express';
import { PedidoController } from '../controllers/pedido.controller';

const router = Router();

router.post('/', PedidoController.crear);
router.get('/', PedidoController.listar);
router.get('/:id', PedidoController.obtener);
router.get('/usuario/:usuarioId', PedidoController.listarPorUsuario);
router.put('/:id', PedidoController.actualizar);
router.delete('/:id', PedidoController.eliminar);

export default router;
