import { Request, Response, NextFunction } from 'express';
import { UsuarioServicio } from '../services/usuario.service';

export const UsuarioControlador = {

    async registrar(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = await UsuarioServicio.registrar(req.body);
            res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario });
        } catch (error: any) {
            let mensaje = 'Error desconocido en el registro';

            if (error.code === 11000) {
                if (error.keyPattern && error.keyValue) {
                    const campo = Object.keys(error.keyPattern)[0];
                    mensaje = campo === 'email'
                        ? 'El correo electrónico ya está registrado.'
                        : campo === 'username'
                            ? 'El nombre de usuario ya está en uso.'
                            : 'Ya existe un registro con ese valor.';
                } else {
                    mensaje = 'Este valor ya está en uso.';
                }
            } else if (error.message.includes('correo')) {
                mensaje = 'El correo electrónico ya está registrado.';
            } else if (error.message.includes('username')) {
                mensaje = 'El nombre de usuario ya está en uso.';
            } else if (error.message) {
                mensaje = error.message;
            }

            res.status(400).json({ mensaje });
        }
    },
    async iniciarSesion(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const datos = await UsuarioServicio.iniciarSesion(email, password);

            res.cookie('token', datos.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000 // 1 día
            });

            res.json({
                token: datos.token,
                usuario: {
                    id: datos.usuario._id,
                    nombre: datos.usuario.nombre,
                    email: datos.usuario.email,
                    rol: datos.usuario.rol
                }
            });
        } catch (error) {
            next(error);
        }
    },

    async cerrarSesion(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies?.token;
            if (!token) {
                return res.status(400).json({ error: 'Token no proporcionado' });
            }

            await UsuarioServicio.cerrarSesion((req as any).userId, token);
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });

            res.json({ mensaje: 'Sesión cerrada correctamente' });
        } catch (error) {
            next(error);
        }
    },

    async perfil(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = await UsuarioServicio.obtenerPerfil((req as any).userId);
            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
            res.json(usuario.toObject({ getters: false, versionKey: false }));
        } catch (error) {
            next(error);
        }
    },

    async obtenerTodos(req: Request, res: Response, next: NextFunction) {
        try {
            const usuarios = await UsuarioServicio.obtenerTodos();
            res.json(usuarios);
        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    },

    async actualizarRol(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { rol } = req.body;

        if (!['admin', 'cliente'].includes(rol)) {
            return res.status(400).json({ mensaje: 'Rol inválido' });
        }

        try {
            const usuario = await UsuarioServicio.actualizarRol(id, rol);
            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
            res.json(usuario);
        } catch (error: any) {
            console.error('Error al actualizar rol:', error.message);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    },

    async eliminar(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        if (id === (req as any).userId) {
            return res.status(400).json({ mensaje: 'No podés eliminarte a vos mismo.' });
        }

        try {
            const resultado = await UsuarioServicio.eliminar(id);
            if (!resultado) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
            res.json({ mensaje: 'Usuario eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    }
};