import { Router } from 'express';
import { LocalidadController } from '../controllers/localidad.controller';

const router = Router();

router.post('/', LocalidadController.crear);
router.get('/', LocalidadController.listar);
router.get('/:id', LocalidadController.obtener);
router.put('/:id', LocalidadController.actualizar);
router.delete('/:id', LocalidadController.eliminar);

export default router;
