import { ServicesService } from '../services/services.service.js';
import { BookingsService } from '../services/bookings.service.js';

const servicesService = new ServicesService();
const bookingsService = new BookingsService();

export const renderServices = async (req, res, next) => {
    try {
        const result = await servicesService.getServices({ limit: 50 });
        res.render('services', { services: result.docs });
    } catch (error) {
        next(error);
    }
};

export const renderAvailability = async (req, res, next) => {
    try {
        const bookings = await bookingsService.getAllBookings();
        const servicesResult = await servicesService.getServices({ limit: 50 });
        res.render('availability', { bookings, availableServices: servicesResult.docs });
    } catch (error) {
        next(error);
    }
};