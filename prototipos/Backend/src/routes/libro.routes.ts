import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as libroController from "../controllers/libro.controller";

const router = Router();

router.post("/crear", asyncHandler(libroController.crearLibro));
router.get("/", asyncHandler(libroController.obtenerLibros));
router.get("/id/:id", asyncHandler(libroController.obtenerLibro));
router.get('/editorial/:id', libroController.obtenerLibrosPorEditorial);
router.put("/:id", asyncHandler(libroController.actualizarLibro));
router.delete("/:id", asyncHandler(libroController.eliminarLibro));

export default router;