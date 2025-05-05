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
	createdAt
	updatedAt
    }

    class Categoria{
        _id: ObjectId
        nombre: string
    }

    class Envio{
        _id: ObjectId
	precio: number
        fecha_entrega_estimada: Date
        fecha_entrega_real: Date
        envio_gratis: boolean
    }

    class Resena{
        _id: ObjectId
        calificacion: number
        comentario: string
        usuario: ObjectId
	libro: ObjectId
	createdAt
	updatedAt
    }

    class Usuario{
        _id: ObjectId
   	username: string
        nombre: string
        apellido: string	
        email: string
        perfil: string
        rol: string
	direccion: string
	codigo_postal: string
        password_hash: string
        tokens: Token[]
	lista_deseos: ObjectId[]
	createdAt
	updatedAt
    }

    class Autor{
        _id: ObjectId
        nombre_completo: string
        perfil: string
    	info: string
	createdAt
	updatedAt
    }

    class Provincia{
        _id: ObjectId
        descripcion: string
    }

    class Localidad{
    	_id: ObjectId
        descripcion: string
    }

    class Editorial{
        _id: ObjectId
        descripcion: string
        direccion: string
        imagen: string
	createdAt
	updatedAt
    }

    class Pedido{
        _id: ObjectId
        usuario: ObjectId
        items:
		- libro: ObjectId
		- cantidad: number
		- precio_unitario: number
        total: number
	estado: string
        fecha_hora: Date
        metodo_pago: string
        envio: ObjectId
	createdAt
	updatedAt
    }
    
    class Oferta{
        _id: ObjectId
        fecha_inicial: Date
        fecha_final: Date
        porcentaje_descuento: number
	libros: ObjectId[]
	createdAt
	updatedAt
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
    Usuario "1" ..|> "*" Token: tokens

note for Libro "formatos admite 'fisico', 'digital' y 'audiolibro'"

note for Pedido "precio_unitario captura el precio en el momento de la compra"

```

## Alcance Funcional

### Mínimo Requerido

| Requerimiento           | Detalle                                                                                                                                                                                                                                  |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CRUD Simple             | 1. CRUD Autor<br>2. CRUD Editorial                                                                                                                                                                                                       |
| CRUD Dependiente        | 1. CRUD Libro **{depende de}** CRUD Autor, CRUD Categoría y CRUD Editorial.                                                                                                                                                              |
| Listado<br>+<br>Detalle | 1. Listado de libros filtrado por categoría, muestra ISBN, título, autores, editorial y precio → **detalle CRUD Libro**.<br> 2. Listado de libros filtrado por autor, muestra ISBN, título, editorial y precio → **detalle CRUD Libro**. |
| CUU/Epic                | 1. Comprar libro<br>2. Ver historial de pedidos                                                                                                                                                                                          |

---

### Adicional para Aprobación

| Requerimiento | Detalle                                                                                                                                                                       |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CRUD          | 1. CRUD Provincia<br>2. CRUD Autor<br>3. CRUD Categoría<br>4. CRUD Editorial<br>5. CRUD Localidad<br>6. CRUD Usuario<br>7. CRUD Libro<br>8. CRUD Reseña<br>9. CRUD Oferta<br> |
| CUU/Epic      | 1. Comprar libro<br>2. Eliminar cuenta<br>3. Gestionar lista de deseos<br>4. Ver historial de pedidos<br>5. Buscar libros por criterios avanzados<br>                         |

---

## Tecnologías Utilizadas
- **Frontend:** Angular, Typescript y Bootstrap.
- **Backend:** Node.js y Express.
- **Base de Datos:** MongoDB y Mongoose.
- **Autenticación:** JWT (tokens seguros con expiración).
- **Pruebas unitarias en el Backend:** Jest y Supertest.
- **Pruebas unitarias en Angular:** Karma y Jasmine / Jest (a definir).
- **Seguridad y Rendimiento:** Helmet, cors y express-rate-limit en Express.
- **Pasarela de Pago:** SDK de Stripe / PayPal (a definir).
- **Subir Portadas:** Cloudinary o Firebase Storage (a definir).
- **Envío de Comprobantes por Email:** Nodemailer / SendGrid (a definir).

### Patrones y Arquitectura utilizada
- TypeScript en el backend (con ts-node o compilación previa) para tipado fuerte y mejor mantenibilidad.
- Capa de Controllers / Services / Repositories siguiendo el principio de responsabilidad única.
- Singleton para la conexión a la base de datos.
- Strategy mínima para distintos métodos de pago o cálculo de envíos.
