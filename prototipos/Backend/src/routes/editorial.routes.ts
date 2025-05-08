import { Router } from "express";
import { EditorialControlador } from "../controllers/editorial.controller";

const router = Router();

router.post("/crear", EditorialControlador.crear);
router.get("/", EditorialControlador.obtenerTodos);
router.get("/id/:id", EditorialControlador.obtenerEditorial);
router.put("/:id", EditorialControlador.actualizar);
router.delete("/:id", EditorialControlador.eliminar);

export default router;