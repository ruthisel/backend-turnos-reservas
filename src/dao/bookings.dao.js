import { BookingModel } from './models/booking.model.js';

export class BookingsDAO {
    async getAll() {
        return await BookingModel.find().lean();
    }

    async getById(id) {
        return await BookingModel.findById(id).lean();
    }

    async create(bookingData) {
        return await BookingModel.create(bookingData);
    }

    async update(id, updatedBooking) {
        return await BookingModel.findByIdAndUpdate(id, updatedBooking, { new: true }).lean();
    }
}