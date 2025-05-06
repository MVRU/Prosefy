"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
// Importar las rutas
const libro_routes_1 = __importDefault(require("./routes/libro.routes"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const categoria_routes_1 = __importDefault(require("./routes/categoria.routes"));
const provincia_routes_1 = __importDefault(require("./routes/provincia.routes"));
const editorial_routes_1 = __importDefault(require("./routes/editorial.routes"));
const autor_routes_1 = __importDefault(require("./routes/autor.routes"));
const oferta_routes_1 = __importDefault(require("./routes/oferta.routes"));
const localidad_routes_1 = __importDefault(require("./routes/localidad.routes"));
const resena_routes_1 = __importDefault(require("./routes/resena.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares globales
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
// Rutas
app.use("/api/libros", libro_routes_1.default);
app.use("/api/usuarios", usuario_routes_1.default);
app.use('/api/categorias', categoria_routes_1.default);
app.use('/api/provincias', provincia_routes_1.default);
app.use('/api/editoriales', editorial_routes_1.default);
app.use('/api/autores', autor_routes_1.default);
app.use('/api/ofertas', oferta_routes_1.default);
app.use('/api/localidades', localidad_routes_1.default);
app.use('/api/resenas', resena_routes_1.default);
app.use((0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Error interno del servidor" });
});
// Conectar a MongoDB
(0, db_1.connectDB)();
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
