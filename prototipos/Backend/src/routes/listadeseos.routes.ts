import { Router } from 'express';
import ListaDeseosController from '../controllers/listadeseos.controller';

const router = Router();

// Ruta para agregar un libro a la lista de deseos
router.post('/lista-deseos', ListaDeseosController.agregarLibroALista);

// Ruta para eliminar un libro de la lista de deseos
router.delete('/lista-deseos/:usuarioId/:libroId', ListaDeseosController.eliminarLibroDeLista);

// Ruta para obtener la lista de deseos de un usuario
router.get('/lista-deseos/:usuarioId', ListaDeseosController.obtenerListaDeseos);

export default router;