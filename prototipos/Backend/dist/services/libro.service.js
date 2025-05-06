"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarLibro = exports.actualizarLibro = exports.obtenerLibroPorId = exports.obtenerLibros = exports.crearLibro = void 0;
const libro_model_1 = require("../models/libro.model");
const crearLibro = async (data) => {
    const nuevoLibro = new libro_model_1.Libro(data);
    return await nuevoLibro.save();
};
exports.crearLibro = crearLibro;
const obtenerLibros = async () => {
    return await libro_model_1.Libro.find().populate("autores categorias editorial");
};
exports.obtenerLibros = obtenerLibros;
const obtenerLibroPorId = async (id) => {
    return await libro_model_1.Libro.findById(id).populate("autores categorias editorial");
};
exports.obtenerLibroPorId = obtenerLibroPorId;
const actualizarLibro = async (id, data) => {
    return await libro_model_1.Libro.findByIdAndUpdate(id, data, { new: true });
};
exports.actualizarLibro = actualizarLibro;
const eliminarLibro = async (id) => {
    return await libro_model_1.Libro.findByIdAndDelete(id);
};
exports.eliminarLibro = eliminarLibro;
