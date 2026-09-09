# Sistema Backend de Gestión de Turnos y Reservas
## Centro Interdisciplinario de Acompañamiento Integral

API REST desarrollada con Node.js, Express y FileSystem para la gestión integral de servicios interdisciplinarios (Psicología, Psicopedagogía, Fonoaudiología, Medicina, Nutrición, Psicomotricidad y Educación Especial) y el sistema de reservas de turnos.

---

##Tecnologías Utilizadas

* **Node.js** (Entorno de ejecución)
* **Express.js** (Framework HTTP y ruteo)
* **ES Modules (`import/export`)** (Sintaxis nativa de JavaScript)
* **dotenv** (Gestión de variables de entorno)
* **fs/promises & path** (Persistencia de datos en archivos JSON)
* **crypto** (Generación de IDs automáticos UUID)

---

##Estructura del Proyecto

```text
proyecto_backend_uno/
├── src/
│   ├── config/
│   │   └── env.config.js       # Configuración de variables de entorno (Fail-Fast)
│   ├── data/
│   │   ├── services.json       # Persistencia de datos de servicios
│   │   └── bookings.json       # Persistencia de datos de reservas
│   ├── managers/
│   │   ├── ServiceManager.js   # Lógica de negocio de servicios
│   │   └── BookingManager.js   # Lógica de negocio de reservas
│   ├── routes/
│   │   ├── services.router.js  # Endpoints REST de servicios
│   │   └── bookings.router.js  # Endpoints REST de reservas
│   ├── app.js                  # Instancia y configuración de Express
│   └── server.js               # Punto de entrada y arranque del servidor
├── .env.example                # Plantilla de variables de entorno
├── .gitignore                  # Archivos ignorados por Git
├── package.json                # Dependencias y scripts
└── README.md                   # Documentación del proyecto