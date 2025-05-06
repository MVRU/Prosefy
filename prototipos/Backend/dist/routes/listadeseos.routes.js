"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listadeseos_controller_1 = __importDefault(require("../controllers/listadeseos.controller"));
const router = (0, express_1.Router)();
// Ruta para agregar un libro a la lista de deseos
router.post('/lista-deseos', listadeseos_controller_1.default.agregarLibroALista);
// Ruta para eliminar un libro de la lista de deseos
router.delete('/lista-deseos/:usuarioId/:libroId', listadeseos_controller_1.default.eliminarLibroDeLista);
// Ruta para obtener la lista de deseos de un usuario
router.get('/lista-deseos/:usuarioId', listadeseos_controller_1.default.obtenerListaDeseos);
exports.default = router;
