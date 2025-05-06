import { Router } from 'express';
import { EnvioController } from '../controllers/envio.controller';

const router = Router();

router.post('/', EnvioController.crear);
router.get('/', EnvioController.listar);
router.get('/:id', EnvioController.obtener);
router.put('/:id', EnvioController.actualizar);
router.delete('/:id', EnvioController.eliminar);

export default router;
