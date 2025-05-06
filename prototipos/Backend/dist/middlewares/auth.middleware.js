"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareAutenticacion = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middlewareAutenticacion = (req, res, next) => {
    const cabeceraAutorizacion = req.headers.authorization;
    // Si no hay cabecera de autorización, enviamos la respuesta sin retornar
    if (!cabeceraAutorizacion) {
        res.status(401).json({ error: 'Token no proporcionado' });
        return;
    }
    const token = cabeceraAutorizacion.split(' ')[1];
    try {
        // Verificamos el token y lo decodificamos
        const decodificado = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secreto123');
        req.userId = decodificado.id;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Token inválido o expirado' });
    }
};
exports.middlewareAutenticacion = middlewareAutenticacion;
