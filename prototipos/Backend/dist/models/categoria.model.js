"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categoriaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
}, {
    timestamps: true,
});
const CategoriaModel = (0, mongoose_1.model)('Categoria', categoriaSchema);
exports.default = CategoriaModel;
