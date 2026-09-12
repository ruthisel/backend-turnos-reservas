import mongoose from 'mongoose';

const bookingItemSchema = new mongoose.Schema(
    {
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true
        },
        quantity: { type: Number, default: 1 }
    },
    { _id: false }
);

const bookingSchema = new mongoose.Schema(
    {
        clientName: { type: String, required: true },
        clientEmail: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        status: { type: String, enum: ['confirmada', 'cancelada', 'pendiente'], default: 'confirmada' },
        services: [bookingItemSchema]
    },
    { timestamps: true }
);

export const BookingModel = mongoose.model('Booking', bookingSchema);