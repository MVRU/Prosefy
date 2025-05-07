import { Router } from "express";
import * as AutorControlador from "../controllers/autor.controller";

const router = Router();

router.get("/:id", AutorControlador.obtenerPorId);
router.get("/", AutorControlador.obtenerTodos);
router.post("/crear", AutorControlador.crear);
router.put("/:id", AutorControlador.actualizar);
router.delete("/:id", AutorControlador.eliminar);

export default router;