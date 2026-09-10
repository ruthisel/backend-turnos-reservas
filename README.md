# Sistema Backend de Gestión de Turnos y Reservas
## Centro Interdisciplinario de Acompañamiento Integral

API REST desarrollada con Node.js, Express y FileSystem para la gestión de servicios interdisciplinarios y reservas de turnos. Organizada bajo una arquitectura modular en 3 capas (Routes, Controllers y Managers).

---

## Tecnologías Utilizadas

* Node.js (Entorno de ejecución)
* Express.js (Framework HTTP y ruteo)
* ES Modules (`import/export`)** (Sintaxis nativa de JavaScript)
* dotenv (Gestión de variables de entorno)
* fs/promises & path (Persistencia de datos en archivos JSON)
* crypto (Generación de IDs automáticos UUID)

---

##Arquitectura y Estructura del Proyecto

El proyecto implementa una separación de responsabilidades clara:
1. Routes: Definen únicamente los endpoints HTTP y derivan la petición al controlador.
2. Controllers: Gestionan la solicitud (`req`), llaman al manager correspondiente y devuelven la respuesta HTTP (`res`).
3. Managers: Contienen la lógica de datos y la persistencia en archivos JSON sin acceso a objetos HTTP.


proyecto_backend_uno/
├── src/
│   ├── config/
│   │   └── env.config.js          # Configuración de variables de entorno (Fail-Fast)
│   ├── controllers/
│   │   ├── services.controller.js # Controlador del recurso Servicios
│   │   └── bookings.controller.js # Controlador del recurso Reservas
│   ├── data/
│   │   ├── services.json          # Persistencia de servicios
│   │   └── bookings.json          # Persistencia de reservas
│   ├── managers/
│   │   ├── ServiceManager.js      # Lógica de datos de servicios
│   │   └── BookingManager.js      # Lógica de datos de reservas
│   ├── routes/
│   │   ├── services.router.js     # Enrutador de servicios
│   │   └── bookings.router.js     # Enrutador de reservas
│   ├── app.js                     # Instancia y configuración de Express
│   └── server.js                  # Punto de entrada y arranque del servidor
├── .env.example                   # Plantilla de variables de entorno
├── .gitignore                     # Archivos ignorados por Git
├── package.json                   # Dependencias y scripts
└── README.md                      # Documentación del proyecto