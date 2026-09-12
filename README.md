# Sistema Backend de Gestión de Turnos y Reservas
## Centro Interdisciplinario de Acompañamiento Integral

API REST profesional con MongoDB Atlas, Handlebars, Socket.io, Paginación y Validaciones Zod.

---

##  Endpoints de la API REST

### Servicios (`/api/services`)
* `GET /api/services?page=1&limit=5&category=psicologia&sortBy=price&order=asc`: Consulta avanzada con paginación, filtro y ordenamiento.
* `POST /api/services`: Crea un nuevo servicio (Validado con Zod).
* `PUT /api/services/:id`: Actualiza un servicio (Validado con Zod).

### Reservas (`/api/bookings`)
* `GET /api/bookings/:bid`: Obtiene una reserva con datos de servicios completamente **populados** (`populate('services.service')`).
* `POST /api/bookings`: Crea una reserva (Validado con Zod).

---

##  Validaciones (Zod)
Todos los datos de entrada son procesados por middlewares de Zod cortando el flujo con respuesta `400 Bad Request` ante datos inválidos antes de impactar la base de datos.  c