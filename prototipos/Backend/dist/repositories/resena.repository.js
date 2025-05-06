"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResenaRepository = void 0;
const resena_model_1 = __importDefault(require("../models/resena.model"));
exports.ResenaRepository = {
    create: (datos) => resena_model_1.default.create(datos),
    findAll: () => resena_model_1.default.find().populate('usuario libro'),
    findById: (id) => resena_model_1.default.findById(id).populate('usuario libro'),
    update: (id, datos) => resena_model_1.default.findByIdAndUpdate(id, datos, { new: true }),
    delete: (id) => resena_model_1.default.findByIdAndDelete(id)
};
