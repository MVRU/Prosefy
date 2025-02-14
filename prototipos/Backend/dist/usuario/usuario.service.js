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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const usuario_entity_1 = require("./usuario.entity");
const bcrypt = require("bcrypt");
let UsuarioService = class UsuarioService {
    constructor(usuarioModel) {
        this.usuarioModel = usuarioModel;
    }
    async crear(createUsuarioDto) {
        const hashedPassword = await bcrypt.hash(createUsuarioDto.contraseña, 10);
        const nuevoUsuario = new this.usuarioModel({
            ...createUsuarioDto,
            contraseña: hashedPassword,
        });
        return nuevoUsuario.save();
    }
    async buscarPorEmail(email) {
        return this.usuarioModel.findOne({ email }).exec();
    }
    async findAll() {
        return this.usuarioModel.find().exec();
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(usuario_entity_1.Usuario.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map