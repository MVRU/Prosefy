import { Router } from 'express';
import * as ProvinciaController from "../controllers/provincia.controller";

const router = Router();

// Rutas para el manejo de provincias
router.post('/crear', ProvinciaController.crearProvincia);
router.get('/', ProvinciaController.obtenerProvincias);
router.put('/:id', ProvinciaController.actualizarProvincia);
router.delete('/:id', ProvinciaController.eliminarProvincia);

export default router;