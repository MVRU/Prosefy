import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response, NextFunction } from 'express';

const router = Router();

// Ruta para verificar estado de sesión
router.get('/status', asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Si llega acá, significa que el authGuard pasó
    res.json({ authenticated: true });
}));

export default router;