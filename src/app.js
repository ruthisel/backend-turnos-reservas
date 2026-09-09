import express from 'express';
import { envConfig } from './config/env.config.js';
import servicesRouter from './routes/services.router.js';
import bookingsRouter from './routes/bookings.router.js';

export const app = express();

console.log(`Sistema inicializado en entorno: ${envConfig.nodeEnv}`);

// Middlewares para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enrutadores principales
app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);

// Exportación por defecto
export default app;