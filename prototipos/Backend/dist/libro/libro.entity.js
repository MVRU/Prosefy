"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibroSchema = exports.Libro = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Libro = class Libro extends mongoose_2.Document {
};
exports.Libro = Libro;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Libro.prototype, "isbn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Libro.prototype, "titulo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Libro.prototype, "idioma", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Libro.prototype, "descripcion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], Libro.prototype, "precio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Date }),
    __metadata("design:type", Date)
], Libro.prototype, "fecha_edicion", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: String, ref: 'Autor', required: true }]),
    __metadata("design:type", Array)
], Libro.prototype, "autores", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'Editorial', required: true }),
    __metadata("design:type", String)
], Libro.prototype, "editorial", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: String, ref: 'Categoria' }]),
    __metadata("design:type", Array)
], Libro.prototype, "categorias", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: String, ref: 'FormatoLibro', required: true }]),
    __metadata("design:type", Array)
], Libro.prototype, "formatos", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 5, type: Number }),
    __metadata("design:type", Number)
], Libro.prototype, "calificacion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Libro.prototype, "portada", void 0);
exports.Libro = Libro = __decorate([
    (0, mongoose_1.Schema)()
], Libro);
exports.LibroSchema = mongoose_1.SchemaFactory.createForClass(Libro);
//# sourceMappingURL=libro.entity.js.map