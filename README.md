# Sistema Backend de Gestión de Turnos y Reservas
## Centro Interdisciplinario de Acompañamiento Integral

API REST y Motor de Vistas en Tiempo Real con Node.js, Express, MongoDB Atlas, Handlebars y Socket.io.

---

## Tecnologías

* Node.js & Express.js
* MongoDB Atlas & Mongoose
* Handlebars (Renderizado del lado del servidor)
* Socket.io (Comunicación bidireccional en tiempo real)
* dotenv

---

##  Arquitectura y Vistas

`Router -> Controller -> Service -> Repository -> DAO (Mongoose) -> MongoDB Atlas`

### Rutas de Vistas (`/views`)
* `GET /views/services`: Gestión y creación de servicios en tiempo real con Socket.io.
* `GET /views/availability`: Consulta de reservas y disponibilidad del centro.