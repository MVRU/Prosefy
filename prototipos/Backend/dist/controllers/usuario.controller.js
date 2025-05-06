"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioControlador = void 0;
const usuario_service_1 = require("../services/usuario.service");
exports.UsuarioControlador = {
    async registrar(req, res) {
        try {
            const usuario = await usuario_service_1.UsuarioServicio.registrar(req.body);
            res.status(201).json(usuario);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async iniciarSesion(req, res) {
        try {
            const { email, password } = req.body;
            const datos = await usuario_service_1.UsuarioServicio.iniciarSesion(email, password);
            res.json(datos);
        }
        catch (err) {
            res.status(401).json({ error: err.message });
        }
    },
    async perfil(req, res) {
        try {
            const usuario = await usuario_service_1.UsuarioServicio.obtenerPerfil(req.userId);
            res.json(usuario);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};
