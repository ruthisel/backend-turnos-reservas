import { BookingsDAO } from '../dao/bookings.dao.js';

export class BookingsRepository {
    constructor() {
        this.dao = new BookingsDAO();
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getById(id) {
        return await this.dao.getById(id);
    }

    async create(data) {
        return await this.dao.create(data);
    }

    async update(id, updatedBooking) {
        return await this.dao.update(id, updatedBooking);
    }
}