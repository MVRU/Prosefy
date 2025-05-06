import { Router } from 'express';
import { UsuarioControlador } from '../controllers/usuario.controller';
import { middlewareAutenticacion } from '../middlewares/auth.middleware';

const router = Router();

router.post('/registrar', UsuarioControlador.registrar);
router.post('/iniciar-sesion', UsuarioControlador.iniciarSesion);
router.get('/perfil', middlewareAutenticacion, UsuarioControlador.perfil);

export default router;