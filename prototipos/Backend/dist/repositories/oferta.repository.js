"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfertaRepository = void 0;
const oferta_model_1 = __importDefault(require("../models/oferta.model"));
exports.OfertaRepository = {
    create: (datos) => oferta_model_1.default.create(datos),
    findAll: () => oferta_model_1.default.find().populate('libros'),
    findById: (id) => oferta_model_1.default.findById(id).populate('libros'),
    update: (id, datos) => oferta_model_1.default.findByIdAndUpdate(id, datos, { new: true }),
    delete: (id) => oferta_model_1.default.findByIdAndDelete(id)
};
