import { Router } from 'express';
import { OfertaController } from '../controllers/oferta.controller';

const router = Router();

router.post('/', OfertaController.crear);
router.get('/', OfertaController.listar);
router.get('/:id', OfertaController.obtener);
router.put('/:id', OfertaController.actualizar);
router.delete('/:id', OfertaController.eliminar);

export default router;