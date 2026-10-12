import { BookingsDAO } from '../dao/bookings.dao.js';

const bookingsDAO = new BookingsDAO();

export class BookingsRepository {
    async getAll() {
        return await bookingsDAO.getAll();
    }

    async getById(id) {
        return await bookingsDAO.getById(id);
    }

    async create(data) {
        return await bookingsDAO.create(data);
    }

    async addServiceToBooking(bookingId, serviceId, quantity) {
        return await bookingsDAO.addServiceToBooking(bookingId, serviceId, quantity);
    }
}