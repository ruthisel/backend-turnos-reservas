import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import servicesRouter from './routes/services.router.js';
import bookingsRouter from './routes/bookings.router.js';
import viewsRouter from './routes/views.router.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'src/public')));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(process.cwd(), 'src/views'));

app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/views', viewsRouter);

// Middleware global de errores
app.use(errorHandler);

export default app;