"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepositorio = void 0;
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
exports.UsuarioRepositorio = {
    async encontrarPorEmail(email) {
        return usuario_model_1.default.findOne({ email });
    },
    async encontrarPorId(id) {
        return usuario_model_1.default.findById(id).populate('lista_deseos');
    },
    async crear(datosUsuario) {
        const usuario = new usuario_model_1.default(datosUsuario);
        return usuario.save();
    },
    async actualizar(id, actualizaciones) {
        return usuario_model_1.default.findByIdAndUpdate(id, actualizaciones, { new: true });
    }
};
