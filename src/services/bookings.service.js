import crypto from 'crypto';
import { BookingsRepository } from '../repositories/bookings.repository.js';
import { ServicesRepository } from '../repositories/services.repository.js';

export class BookingsService {
    constructor() {
        this.bookingsRepository = new BookingsRepository();
        this.servicesRepository = new ServicesRepository();
    }

    async createBooking(bookingData) {
        const { clientName, clientEmail, date, time, services } = bookingData;

        if (!clientName || !clientEmail || !date || !time) {
            return null;
        }

        const newBooking = {
            id: crypto.randomUUID(),
            clientName,
            clientEmail,
            date,
            time,
            status: 'pending',
            services: Array.isArray(services) ? services : []
        };

        return await this.bookingsRepository.create(newBooking);
    }

    async getBookingById(id) {
        return await this.bookingsRepository.getById(id);
    }

    async addServiceToBooking(bookingId, serviceId) {
        // 1. Validar existencia del servicio usando ServicesRepository
        const serviceExists = await this.servicesRepository.getById(serviceId);
        if (!serviceExists) {
            return { error: 'SERVICE_NOT_FOUND' };
        }

        // 2. Validar existencia de la reserva
        const booking = await this.bookingsRepository.getById(bookingId);
        if (!booking) {
            return { error: 'BOOKING_NOT_FOUND' };
        }

        // 3. Regla de negocio: Si el servicio ya existe en la reserva, incrementamos quantity
        const existingServiceIndex = booking.services.findIndex(
            s => String(s.service) === String(serviceId)
        );

        if (existingServiceIndex !== -1) {
            booking.services[existingServiceIndex].quantity += 1;
        } else {
            booking.services.push({
                service: serviceId,
                quantity: 1
            });
        }

        // 4. Guardar cambios a través del repository
        return await this.bookingsRepository.update(bookingId, booking);
    }
}