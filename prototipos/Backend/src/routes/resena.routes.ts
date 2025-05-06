import { Router } from 'express';
import { ResenaController } from '../controllers/resena.controller';

const router = Router();

router.post('/', ResenaController.crear);
router.get('/', ResenaController.listar);
router.get('/:id', ResenaController.obtener);
router.put('/:id', ResenaController.actualizar);
router.delete('/:id', ResenaController.eliminar);

export default router;
