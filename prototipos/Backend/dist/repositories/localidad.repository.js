"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalidadRepository = void 0;
const localidad_model_1 = __importDefault(require("../models/localidad.model"));
exports.LocalidadRepository = {
    create: (datos) => localidad_model_1.default.create(datos),
    findAll: () => localidad_model_1.default.find().populate('provincia'),
    findById: (id) => localidad_model_1.default.findById(id).populate('provincia'),
    update: (id, datos) => localidad_model_1.default.findByIdAndUpdate(id, datos, { new: true }),
    delete: (id) => localidad_model_1.default.findByIdAndDelete(id)
};
