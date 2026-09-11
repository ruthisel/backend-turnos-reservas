# Sistema Backend de Gestión de Turnos y Reservas
## Centro Interdisciplinario de Acompañamiento Integral

API REST desarrollada con Node.js, Express y FileSystem para la gestión de servicios interdisciplinarios y reservas de turnos. Implementa una arquitectura profesional en capas (Routes, Controllers, Services, Repositories y DAO).

---

## Tecnologías Utilizadas

* Node.js (Entorno de ejecución)
* Express.js (Framework HTTP y ruteo)
* ES Modules (`import/export`)** (Sintaxis nativa de JavaScript)
* dotenv (Gestión de variables de entorno)
* fs/promises & path (Persistencia de datos en archivos JSON)
* crypto (Generación de IDs automáticos UUID)

---

##  Arquitectura en Capas

Flujo de la aplicación:
`Router -> Controller -> Service -> Repository -> DAO -> Archivo JSON`

* Routes: Definen endpoints y se conectan con los controladores.
* Controllers: Reciben peticiones HTTP (`req`), invocan servicios y responden (`res`).
*   Services: Contienen las reglas de negocio (ej. validaciones e incremento de `quantity`).
* Repositories: Abstraen el acceso a datos independizando la lógica de negocio.
* DAO (Data Access Object): Lee y escribe directamente en los archivos JSON.

```text
proyecto_backend_uno/
├── src/
│   ├── config/
│   │   └── env.config.js          # Variables de entorno
│   ├── controllers/
│   │   ├── services.controller.js # Controlador de servicios
│   │   └── bookings.controller.js # Controlador de reservas
│   ├── services/
│   │   ├── services.service.js    # Lógica de negocio de servicios
│   │   └── bookings.service.js    # Lógica de negocio de reservas
│   ├── repositories/
│   │   ├── services.repository.js # Abstracción de datos de servicios
│   │   └── bookings.repository.js # Abstracción de datos de reservas
│   ├── dao/
│   │   ├── services.dao.js        # Persistencia FileSystem servicios
│   │   └── bookings.dao.js        # Persistencia FileSystem reservas
│   ├── routes/
│   │   ├── services.router.js     # Rutas de servicios
│   │   └── bookings.router.js     # Rutas de reservas
│   ├── data/
│   │   ├── services.json          # Archivo JSON de servicios
│   │   └── bookings.json          # Archivo JSON de reservas
│   ├── app.js                     # Configuración Express
│   └── server.js                  # Inicialización del servidor
├── .env.example
├── .gitignore
├── package.json
└── README.md