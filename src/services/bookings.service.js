import { BookingsDAO } from '../dao/bookings.dao.js';

const bookingsDAO = new BookingsDAO();

export class BookingsService {
    async getAllBookings() {
        return await bookingsDAO.getAll();
    }

    async getBookingById(id) {
        return await bookingsDAO.getById(id);
    }

    async createBooking(bookingData) {
        return await bookingsDAO.create(bookingData);
    }

    async addServiceToBooking(bookingId, serviceId, quantity) {
        return await bookingsDAO.addServiceToBooking(bookingId, serviceId, quantity);
    }
}