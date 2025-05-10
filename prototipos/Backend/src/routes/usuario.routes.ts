import { Router } from 'express';
import { UsuarioControlador } from '../controllers/usuario.controller';
import { authGuard } from '../guards/auth.guard';
import { middlewareAutenticacion } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// Rutas públicas
router.post('/registrar', asyncHandler(UsuarioControlador.registrar));
router.post('/iniciar-sesion', asyncHandler(UsuarioControlador.iniciarSesion));

// Rutas protegidas con authGuard
router.get('/perfil', authGuard(), asyncHandler(UsuarioControlador.perfil));
router.post('/cerrar-sesion', authGuard(), asyncHandler(UsuarioControlador.cerrarSesion));

export default router;