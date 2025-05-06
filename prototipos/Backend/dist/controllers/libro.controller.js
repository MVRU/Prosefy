"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarLibro = exports.actualizarLibro = exports.obtenerLibro = exports.obtenerLibros = exports.crearLibro = void 0;
const libroService = __importStar(require("../services/libro.service"));
const crearLibro = async (req, res, next) => {
    try {
        const libro = await libroService.crearLibro(req.body);
        res.status(201).json(libro);
    }
    catch (error) {
        next(error);
    }
};
exports.crearLibro = crearLibro;
const obtenerLibros = async (req, res, next) => {
    try {
        const libros = await libroService.obtenerLibros();
        res.json(libros);
    }
    catch (error) {
        next(error);
    }
};
exports.obtenerLibros = obtenerLibros;
const obtenerLibro = async (req, res, next) => {
    try {
        const libro = await libroService.obtenerLibroPorId(req.params.id);
        if (!libro) {
            res.status(404).json({ error: "Libro no encontrado" });
        }
        else {
            res.json(libro);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.obtenerLibro = obtenerLibro;
const actualizarLibro = async (req, res, next) => {
    try {
        const libro = await libroService.actualizarLibro(req.params.id, req.body);
        if (!libro) {
            res.status(404).json({ error: "Libro no encontrado" });
        }
        else {
            res.json(libro);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.actualizarLibro = actualizarLibro;
const eliminarLibro = async (req, res, next) => {
    try {
        const libro = await libroService.eliminarLibro(req.params.id);
        if (!libro) {
            res.status(404).json({ error: "Libro no encontrado" });
        }
        else {
            res.json({ mensaje: "Libro eliminado" });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.eliminarLibro = eliminarLibro;
