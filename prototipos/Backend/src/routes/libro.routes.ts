import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as libroController from "../controllers/libro.controller";
import { validate } from "../middlewares/validate.middleware";
import { createLibroSchema, updateLibroSchema } from "../schemas/libro.schema";

const router = Router();

router.post("/crear", validate(createLibroSchema), asyncHandler(libroController.crearLibro));
router.get("/", asyncHandler(libroController.obtenerLibros));
router.get("/id/:id", asyncHandler(libroController.obtenerLibro));
router.get('/editorial/:id', asyncHandler(libroController.obtenerLibrosPorEditorial));
router.get('/autor/:id', asyncHandler(libroController.obtenerLibrosPorAutor));
router.get('/categoria/:id', asyncHandler(libroController.obtenerLibrosPorCategoria));
router.put("/:id", validate(updateLibroSchema), asyncHandler(libroController.actualizarLibro));
router.delete("/:id", asyncHandler(libroController.eliminarLibro));

export default router;