import express from 'express';
import { envConfig } from './config/env.config.js';
import servicesRouter from './routes/services.router.js';

export const app = express();

console.log(`Sistema inicializado en entorno: ${envConfig.nodeEnv}`);

// Middlewares para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enrutador principal de servicios
app.use('/api/services', servicesRouter);

// Exportación por defecto opcional para mantener compatibilidad
export default app;