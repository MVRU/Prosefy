import { Router } from "express";
import { AutorControlador } from "../controllers/autor.controller";

const router = Router();

router.post("/crear", AutorControlador.crear);
router.get("/", AutorControlador.obtenerTodos);
router.put("/:id", AutorControlador.actualizar);
router.delete("/:id", AutorControlador.eliminar);

export default router;
