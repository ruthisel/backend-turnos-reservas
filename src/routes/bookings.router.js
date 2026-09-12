import { Router } from 'express';
import { getBookings, getBookingById, createBooking } from '../controllers/bookings.controller.js';
import { validateBody, bookingSchema } from '../middlewares/validation.middleware.js';

const router = Router();

router.get('/', getBookings);
router.get('/:bid', getBookingById);
router.post('/', validateBody(bookingSchema), createBooking);

export default router;