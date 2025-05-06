"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioServicio = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_repository_1 = require("../repositories/usuario.repository");
const JWT_SECRET = process.env.JWT_SECRET || 'secreto123';
exports.UsuarioServicio = {
    async registrar(datos) {
        const existe = await usuario_repository_1.UsuarioRepositorio.encontrarPorEmail(datos.email);
        if (existe)
            throw new Error('El correo electrónico ya está registrado');
        const hash = await bcryptjs_1.default.hash(datos.password, 10);
        return usuario_repository_1.UsuarioRepositorio.crear({
            ...datos,
            password_hash: hash,
            tokens: []
        });
    },
    async iniciarSesion(email, password) {
        const usuario = await usuario_repository_1.UsuarioRepositorio.encontrarPorEmail(email);
        if (!usuario)
            throw new Error('Credenciales inválidas');
        const valido = await bcryptjs_1.default.compare(password, usuario.password_hash);
        if (!valido)
            throw new Error('Credenciales inválidas');
        const token = jsonwebtoken_1.default.sign({ id: usuario._id }, JWT_SECRET, { expiresIn: '1d' });
        usuario.tokens.push({ token, fecha_expiracion: new Date(Date.now() + 86400000) });
        await usuario.save();
        return { token, usuario };
    },
    async obtenerPerfil(id) {
        return usuario_repository_1.UsuarioRepositorio.encontrarPorId(id);
    }
};
