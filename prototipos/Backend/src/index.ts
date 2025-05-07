import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { Request, Response, NextFunction } from "express";

// Importar las rutas
import libroRoutes from "./routes/libro.routes";
import usuarioRoutes from "./routes/usuario.routes";
import categoriaRoutes from './routes/categoria.routes';
import provinciaRoutes from './routes/provincia.routes';
import editorialRoutes from './routes/editorial.routes';
import autorRoutes from './routes/autor.routes';
import ofertaRoutes from './routes/oferta.routes';
import localidadRoutes from './routes/localidad.routes';
import resenaRoutes from './routes/resena.routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rutas
app.use("/api/libros", libroRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/provincias', provinciaRoutes);
app.use('/api/editoriales', editorialRoutes);
app.use('/api/autores', autorRoutes);
app.use('/api/ofertas', ofertaRoutes);
app.use('/api/localidades', localidadRoutes);
app.use('/api/resenas', resenaRoutes);

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