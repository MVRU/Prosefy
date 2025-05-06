import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import libroRoutes from "./routes/libro.routes";
import { Request, Response, NextFunction } from "express";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api/libros", libroRoutes);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Error interno del servidor" });
});

// Conectar a MongoDB
connectDB();

app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});