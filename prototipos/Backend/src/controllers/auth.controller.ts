import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// Simulación de base de datos temporal
const users = [{ email: "test@prosefy.com", password: "123456" }];

export const login = (req: Request, res: Response): Response => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
    });

    return res.json({ token });
};

export const register = (req: Request, res: Response): Response => {
    const { email, password } = req.body;

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        return res.status(400).json({ message: "Usuario ya registrado" });
    }

    users.push({ email, password });

    return res.status(201).json({ message: "Usuario registrado correctamente" });
};