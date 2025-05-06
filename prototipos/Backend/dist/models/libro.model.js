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
exports.Libro = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const LibroSchema = new mongoose_1.Schema({
    isbn: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    idioma: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    fecha_edicion: { type: Date, required: true },
    portada: { type: String },
    formatos: {
        type: [String],
        enum: ["fisico", "digital", "audiolibro"],
        required: true
    },
    autores: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Autor", required: true }],
    categorias: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Categoria", required: true }],
    editorial: { type: mongoose_1.Schema.Types.ObjectId, ref: "Editorial", required: true }
}, {
    timestamps: true
});
exports.Libro = mongoose_1.default.model("Libro", LibroSchema);
