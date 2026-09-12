import { BookingsService } from '../services/bookings.service.js';

const bookingsService = new BookingsService();

export const getBookings = async (req, res) => {
    try {
        const bookings = await bookingsService.getAllBookings();
        res.json({ status: 'success', payload: bookings });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const booking = await bookingsService.getBookingById(req.params.bid);
        if (!booking) {
            return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' });
        }
        res.json({ status: 'success', payload: booking });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const createBooking = async (req, res) => {
    try {
        const newBooking = await bookingsService.createBooking(req.body);
        res.status(201).json({ status: 'success', payload: newBooking });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};