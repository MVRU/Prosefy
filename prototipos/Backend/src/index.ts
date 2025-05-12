import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import libroRoutes from "./routes/libro.routes";
import usuarioRoutes from "./routes/usuario.routes";
import categoriaRoutes from './routes/categoria.routes';
import provinciaRoutes from './routes/provincia.routes';
import editorialRoutes from './routes/editorial.routes';
import autorRoutes from './routes/autor.routes';
import localidadRoutes from './routes/localidad.routes';
import ofertaRoutes from './routes/oferta.routes';
import resenaRoutes from './routes/resena.routes';
import authRoutes from './routes/auth.routes';
import pedidoRoutes from './routes/pedido.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Parsear cookies
app.use(cookieParser());

// Seguridad y CORS

// Lista de orígenes permitidos
const allowedOrigins = [
    'http://localhost:4200',       // Entorno de desarrollo Angular
    'http://127.0.0.1:4200',
    'https://prosefy.vercel.app'   // App desplegada en Vercel
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log(`Origen bloqueado por CORS: ${origin}`);
            callback(new Error('Origen no permitido por CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}));

// Rutas
app.use("/api/libros", libroRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/provincias", provinciaRoutes);
app.use("/api/editoriales", editorialRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/localidades", localidadRoutes);
app.use("/api/ofertas", ofertaRoutes);
app.use("/api/resenas", resenaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/pedidos", pedidoRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});