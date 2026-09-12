import { BookingModel } from './models/booking.model.js';

export class BookingsDAO {
    async getAll() {
        return await BookingModel.find().populate('services.service').lean();
    }

    async getById(id) {
        return await BookingModel.findById(id).populate('services.service').lean();
    }

    async create(bookingData) {
        const newBooking = await BookingModel.create(bookingData);
        return await BookingModel.findById(newBooking._id).populate('services.service').lean();
    }

    async addServiceToBooking(bookingId, serviceId, quantity = 1) {
        const booking = await BookingModel.findById(bookingId);
        if (!booking) return null;

        const existingIndex = booking.services.findIndex(
            (item) => item.service.toString() === serviceId
        );

        if (existingIndex > -1) {
            booking.services[existingIndex].quantity += quantity;
        } else {
            booking.services.push({ service: serviceId, quantity });
        }

        await booking.save();
        return await BookingModel.findById(bookingId).populate('services.service').lean();
    }
}