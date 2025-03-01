# Propuesta TP DSW

## Grupo

### Integrantes

-   46950 - Retamal, Alejo
-   48042 - Milo, Marina Ana

### Repositorios

-   [Frontend & Backend App](https://github.com/MVRU/Prosefy/tree/main/prototipos)

## E-commerce de Libros "Prosefy"

### Descripción

Prosefy es una plataforma de e-commerce especializada en libros que permite a los usuarios:
- **Explorar un catálogo diverso** filtrando por categoría, autor, formato (físico/digital/audiolibro) y ofertas vigentes.
- **Acceder a detalles enriquecidos de cada libro:** sinopsis, autores, reseñas, calificaciones y opciones de compra.
- **Gestionar compras de forma intuitiva** con carrito, métodos de pago, seguimiento de envíos y comprobantes digitales.
- **Personalizar su experiencia** mediante listas de deseos, seguimiento de autores y perfil de usuario editable.

### Modelo de Datos

```mermaid
classDiagram
    class Libro{
        _id: ObjectId
        isbn: string
        titulo: string
        idioma: string
        descripcion: string
        precio: number
        fecha_edicion: Date
	    portada: string
        formatos: string[]
    }
    class Categoria{
        _id: ObjectId
        nombre: string
    }
    class Envio{
        _id: ObjectId
        estado: string
        fecha_entrega_estimada: Date
        fecha_entrega_real: Date
        envio_gratis: boolean
    }
	class HistorialPreciosEnvio{
        _id: ObjectId
		fecha_vigencia: Date
		precio: number
		umbral_envio_gratis: number
	}
    class Resena{
        _id: ObjectId
        calificacion: number
        comentario: string
        usuario: ObjectId
    }
    class Usuario{
        _id: ObjectId
	    username: string
        nombre: string
        apellido: string	
        email: string
        direccion: string
        perfil: string
        rol: string
        password_hash: string
        tokens: Token[]
    }
    class Autor{
        _id: ObjectId
        nombre_completo: string
        perfil: string
	    info: string
    }
    class Provincia{
        _id: ObjectId
        descripcion: string
    }
    class Localidad{
	    _id: ObjectId
        codigo_postal: string
        descripcion: string
    }
    class Editorial{
        _id: ObjectId
        descripcion: string
        direccion: string
        imagen: string
    }
    class Pedido{
        _id: ObjectId
        usuario: ObjectId
        items: ObjectId[]
        total: number
        fecha_hora: Date
        metodo_pago: string
        envio: ObjectId
    }
    class Oferta{
        _id: ObjectId
        fecha_inicial: Date
        fecha_final: Date
        porcentaje_descuento: number
    }
    class Token{
        <<interface>>
        token: string
        fecha_expiracion: Date
    }
    class ListaDeseos{
        _id: ObjectId
        usuario: ObjectId
        libro: ObjectId
    }
    class PedidoItem{
        _id: ObjectId
        libro: ObjectId
        cantidad: number
        precio_unitario: number
    }

    Libro "*" -- "1..*" Categoria: categorias
    Libro "*" -- "1..*" Autor: autores
    Libro "*" -- "1" Editorial
    Pedido "*" -- "1" Usuario
    Usuario "1" -- "*" ListaDeseos: lista_deseos
    ListaDeseos "*" -- "1" Libro
    Resena "*" -- "1" Usuario
    Localidad "1" -- "*" Usuario
    Localidad "*" -- "1" Provincia
    Oferta "*" -- "1..*" Libro
    Resena "*" -- "1" Libro
    Envio "0..1" -- "1" Pedido
    Pedido "1" -- "1..*" PedidoItem: items
    PedidoItem "*" -- "1" Libro
    Usuario "1" ..|> "*" Token: tokens
    Envio "1" -- "1" HistorialPreciosEnvio

note for Libro "formatos admite 'fisico', 'digital' y 'audiolibro'"

note for PedidoItem "precio_unitario captura el precio en el momento de la compra"

note for HistorialPreciosEnvio "Si el importe total de un pedido
supera el valor de 'umbral_envio_gratis'
el envío será gratuito"
```

## Alcance Funcional

### Mínimo Requerido (Regularidad)

| Requerimiento           | Detalle                                                                                                                                                                                                                                  |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CRUD Simple             | 1. CRUD Autor<br>2. CRUD Editorial                                                                                                                                                                                                       |
| CRUD Dependiente        | 1. CRUD Libro **{depende de}** CRUD Autor, CRUD Categoría y CRUD Editorial.                                                                                                                                                              |
| Listado<br>+<br>Detalle | 1. Listado de libros filtrado por categoría, muestra ISBN, título, autores, editorial y precio → **detalle CRUD Libro**.<br> 2. Listado de libros filtrado por autor, muestra ISBN, título, editorial y precio → **detalle CRUD Libro**. |
| CUU/Epic                | 1. Comprar libro<br>2. Reseñar libro                                                                                                                                                                                                     |

<!-- Otros CUU:
1. Buscar libros por criterios avanzados: rango de precios, formato, calificación promedio
2. Ver historial de pedidos
3. Gestionar lista de deseos -->

---

### Adicional para Aprobación

| Requerimiento | Detalle                                                                                                                                                                       |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CRUD          | 1. CRUD Provincia<br>2. CRUD Autor<br>3. CRUD Categoría<br>4. CRUD Editorial<br>5. CRUD Localidad<br>6. CRUD Usuario<br>7. CRUD Libro<br>8. CRUD Reseña<br>9. CRUD Oferta<br> |
| CUU/Epic      | 1. Comprar libro<br>2. Eliminar cuenta<br>3. Gestionar lista de deseos<br>4. Ver historial de pedidos<br> 5. Buscar libros por criterios avanzados <br>                       |

---

## Tecnologías Utilizadas
- **Frontend:** Angular, Typescript y Bootstrap.
- **Backend:** Node.js y Express.
- **Base de Datos:** MongoDB y Mongoose.
- **Autenticación:** JWT (tokens seguros con expiración).