# Sistema Backend de Gestión de Turnos y Reservas
## Centro Interdisciplinario de Acompañamiento Integral — Entrega Final

API REST profesional con MongoDB Atlas, Handlebars, Socket.io, Paginación, Validaciones Zod y Manejo Centralizado de Errores.

---

##  Tecnologías Utilizadas
* Node.js & Express.js
* MongoDB Atlas & Mongoose
* `mongoose-paginate-v2` & Zod
* Handlebars & Socket.io

---

##  Arquitectura en Capas
`Routes -> Controllers -> Services -> Repositories -> DAO (Mongoose) -> Models`

---

##  Endpoints Principales
* `GET /api/services`: Listado con filtros, paginación y ordenamiento.
* `POST /api/services`: Crea un servicio (Validado con Zod).
* `GET /api/bookings/:bid`: Consulta reserva con `populate`.
* `POST /api/bookings`: Crea una reserva asociando servicios por `ObjectId`.
* `GET /views/services`: Panel en tiempo real con Socket.io.
* `GET /views/availability`: Panel de reservas con selector dinámico.