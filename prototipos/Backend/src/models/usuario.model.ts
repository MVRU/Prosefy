import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IToken {
    token: string;
    fecha_expiracion: Date;
}

export interface IUsuario extends Document {
    _id: ObjectId;
    username: string;
    nombre: string;
    apellido: string;
    email: string;
    perfil: string;
    rol: 'admin' | 'cliente';
    direccion: string;
    codigo_postal: string;
    password_hash: string;
    tokens: IToken[];
    lista_deseos: mongoose.Types.ObjectId[];
}

const TokenSchema = new Schema<IToken>({
    token: { type: String, required: true },
    fecha_expiracion: { type: Date, required: true }
});

const UsuarioSchema = new Schema<IUsuario>(
    {
        username: { type: String, required: true, unique: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        perfil: { type: String },
        rol: { type: String, enum: ['admin', 'cliente'], default: 'cliente' },
        direccion: { type: String },
        codigo_postal: { type: String },
        password_hash: { type: String, required: true },
        tokens: [TokenSchema],
        lista_deseos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ListaDeseos' }]
    },
    { timestamps: true }
);

export default mongoose.model<IUsuario>('Usuario', UsuarioSchema, "usuarios");
