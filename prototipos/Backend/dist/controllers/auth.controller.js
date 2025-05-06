"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
// Simulación de base de datos temporal
const users = [{ email: "test@prosefy.com", password: "123456" }];
const login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = jsonwebtoken_1.default.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
    });
    return res.json({ token });
};
exports.login = login;
const register = (req, res) => {
    const { email, password } = req.body;
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "Usuario ya registrado" });
    }
    users.push({ email, password });
    return res.status(201).json({ message: "Usuario registrado correctamente" });
};
exports.register = register;
