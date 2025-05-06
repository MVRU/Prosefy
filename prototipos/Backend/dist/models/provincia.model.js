"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const provinciaSchema = new mongoose_1.Schema({
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});
const ProvinciaModel = (0, mongoose_1.model)('Provincia', provinciaSchema);
exports.default = ProvinciaModel;
