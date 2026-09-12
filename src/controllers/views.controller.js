import { ServicesService } from '../services/services.service.js';
import { BookingsService } from '../services/bookings.service.js';

const servicesService = new ServicesService();
const bookingsService = new BookingsService();

export const renderServices = async (req, res) => {
    try {
        const services = await servicesService.getServices();
        res.render('services', { services });
    } catch (error) {
        res.status(500).send('Error al cargar las vistas de servicios');
    }
};

export const renderAvailability = async (req, res) => {
    try {
        const bookings = await bookingsService.getAllBookings ? await bookingsService.getAllBookings() : [];
        res.render('availability', { bookings });
    } catch (error) {
        res.status(500).send('Error al cargar las vistas de disponibilidad');
    }
};