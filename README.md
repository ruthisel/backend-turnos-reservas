# Sistema Backend de Gestión de Turnos y Reservas
## Centro Interdisciplinario de Acompañamiento Integral

API REST desarrollada con Node.js, Express y MongoDB Atlas con Mongoose. Arquitectura en capas (Routes, Controllers, Services, Repositories, DAO y Models).

---

## Tecnologías Utilizadas

* Node.js & Express.js
* MongoDB Atlas & Mongoose
* dotenv (Gestión de variables de entorno)
* ES Modules (`import/export`)

---

## Arquitectura en Capas

`Router -> Controller -> Service -> Repository -> DAO (Mongoose) -> MongoDB Atlas`

```text
proyecto_backend_uno/
├── src/
│   ├── config/
│   │   ├── env.config.js          # Variables de entorno
│   │   └── database.config.js     # Conexión Mongoose / MongoDB Atlas
│   ├── controllers/
│   │   ├── services.controller.js # Controlador de servicios
│   │   └── bookings.controller.js # Controlador de reservas
│   ├── services/
│   │   ├── services.service.js    # Lógica de negocio
│   │   └── bookings.service.js    # Lógica de negocio
│   ├── repositories/
│   │   ├── services.repository.js # Abstracción de datos
│   │   └── bookings.repository.js # Abstracción de datos
│   ├── dao/
│   │   ├── models/
│   │   │   ├── service.model.js   # Modelo Mongoose servicios
│   │   │   ├── booking.model.js   # Modelo Mongoose reservas
│   │   │   └── message.model.js   # Modelo Mongoose mensajes
│   │   ├── services.dao.js        # DAO MongoDB servicios
│   │   └── bookings.dao.js        # DAO MongoDB reservas
│   ├── routes/
│   │   ├── services.router.js     # Rutas de servicios
│   │   └── bookings.router.js     # Rutas de reservas
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md