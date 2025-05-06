import { Router } from 'express';
import { CategoriaController } from '../controllers/categoria.controller';

const router = Router();

router.post('/crear', CategoriaController.crearCategoria);
router.get('/', CategoriaController.obtenerCategorias);
router.put('/:id', CategoriaController.actualizarCategoria);
router.delete('/:id', CategoriaController.eliminarCategoria);

export default router;