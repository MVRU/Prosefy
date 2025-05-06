"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProvincia = exports.actualizarProvincia = exports.obtenerProvincias = exports.crearProvincia = void 0;
const provincia_service_1 = __importDefault(require("../services/provincia.service"));
const crearProvincia = async (req, res, next) => {
    try {
        const nuevaProvincia = await provincia_service_1.default.crearProvincia(req.body.descripcion);
        res.status(201).json(nuevaProvincia);
    }
    catch (error) {
        next(error);
    }
};
exports.crearProvincia = crearProvincia;
const obtenerProvincias = async (req, res, next) => {
    try {
        const provincias = await provincia_service_1.default.obtenerProvincias();
        res.json(provincias);
    }
    catch (error) {
        next(error);
    }
};
exports.obtenerProvincias = obtenerProvincias;
const actualizarProvincia = async (req, res, next) => {
    try {
        const provinciaActualizada = await provincia_service_1.default.actualizarProvincia(req.params.id, req.body);
        if (!provinciaActualizada) {
            res.status(404).json({ error: "Provincia no encontrada" });
        }
        else {
            res.json(provinciaActualizada);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.actualizarProvincia = actualizarProvincia;
const eliminarProvincia = async (req, res, next) => {
    try {
        const provinciaEliminada = await provincia_service_1.default.eliminarProvincia(req.params.id);
        if (!provinciaEliminada) {
            res.status(404).json({ error: "Provincia no encontrada" });
        }
        else {
            res.json({ mensaje: "Provincia eliminada" });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.eliminarProvincia = eliminarProvincia;
