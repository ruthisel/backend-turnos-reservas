import { Router } from 'express';
import { BookingManager } from '../managers/BookingManager.js';

const router = Router();
const bookingManager = new BookingManager();

// POST /api/bookings - Crea una nueva reserva 
router.post('/', async (req, res) => {
    try {
        const newBooking = await bookingManager.createBooking(req.body);

        if (!newBooking) {
            return res.status(400).json({
                status: 'error',
                message: 'Faltan campos obligatorios (clientName, clientEmail, date, time)'
            });
        }

        res.status(201).json({ status: 'success', payload: newBooking });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// GET /api/bookings/:bid - Obtiene una reserva por ID
router.get('/:bid', async (req, res) => {
    try {
        const { bid } = req.params;
        const booking = await bookingManager.getBookingById(bid);

        if (!booking) {
            return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' });
        }

        res.status(200).json({ status: 'success', payload: booking });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// POST /api/bookings/:bid/services/:sid - Agrega un servicio a una reserva existente
router.post('/:bid/services/:sid', async (req, res) => {
    try {
        const { bid, sid } = req.params;
        const result = await bookingManager.addServiceToBooking(bid, sid);

        if (result.error === 'BOOKING_NOT_FOUND') {
            return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' });
        }

        if (result.error === 'SERVICE_NOT_FOUND') {
            return res.status(404).json({ status: 'error', message: 'El servicio que intenta agregar no existe' });
        }

        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

export default router;