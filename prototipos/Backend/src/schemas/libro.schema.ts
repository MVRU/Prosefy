import { z } from "zod";

export const createLibroSchema = z.object({
    body: z.object({
        isbn: z.string().min(10, "El ISBN debe tener al menos 10 caracteres"),
        titulo: z.string().min(1, "El título es obligatorio"),
        idioma: z.string().min(1, "El idioma es obligatorio"),
        descripcion: z.string().optional(),
        precio: z.number().min(0, "El precio no puede ser negativo"),
        calificacion: z.number().min(0).max(5).optional(),
        fecha_edicion: z.string().or(z.date()).transform((val) => new Date(val)),
        portada: z.string().url("La portada debe ser una URL válida").optional(),
        formatos: z.array(z.enum(["fisico", "digital", "audiolibro"])).min(1, "Debe seleccionar al menos un formato"),
        autores: z.array(z.string().length(24, "ID de autor inválido")),
        categorias: z.array(z.string().length(24, "ID de categoría inválido")),
        editorial: z.string().length(24, "ID de editorial inválido"),
    }),
});

export const updateLibroSchema = z.object({
    body: z.object({
        isbn: z.string().min(10).optional(),
        titulo: z.string().min(1).optional(),
        idioma: z.string().min(1).optional(),
        descripcion: z.string().optional(),
        precio: z.number().min(0).optional(),
        calificacion: z.number().min(0).max(5).optional(),
        fecha_edicion: z.string().or(z.date()).transform((val) => new Date(val)).optional(),
        portada: z.string().url().optional(),
        formatos: z.array(z.enum(["fisico", "digital", "audiolibro"])).optional(),
        autores: z.array(z.string().length(24)).optional(),
        categorias: z.array(z.string().length(24)).optional(),
        editorial: z.string().length(24).optional(),
    }),
});
