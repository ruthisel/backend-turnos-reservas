import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { ServiceManager } from './ServiceManager.js';

const DATA_DIR = './src/data';
const FILE_PATH = path.join(DATA_DIR, 'bookings.json');

export class BookingManager {
    constructor() {
        this.serviceManager = new ServiceManager();
    }

    // Método privado para asegurar que la carpeta y el archivo existan automáticamente
    async #ensureFileExists() {
        try {
            await fs.mkdir(DATA_DIR, { recursive: true });
            await fs.access(FILE_PATH);
        } catch (error) {
            await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
        }
    }

    // Método privado para leer el archivo JSON de reservas
    async #readBookings() {
        await this.#ensureFileExists();
        try {
            const data = await fs.readFile(FILE_PATH, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    // Método privado para escribir en el archivo JSON de reservas
    async #writeBookings(bookings) {
        await this.#ensureFileExists();
        await fs.writeFile(FILE_PATH, JSON.stringify(bookings, null, 2), 'utf-8');
    }

    // 1. Crear una nueva reserva (puede iniciarse con un array de services vacío)
    async createBooking(bookingData) {
        const { clientName, clientEmail, date, time, services } = bookingData;

        // Validación de campos obligatorios
        if (!clientName || !clientEmail || !date || !time) {
            return null;
        }

        const bookings = await this.#readBookings();

        const newBooking = {
            id: crypto.randomUUID(),
            clientName,
            clientEmail,
            date,
            time,
            status: 'pending',
            services: Array.isArray(services) ? services : []
        };

        bookings.push(newBooking);
        await this.#writeBookings(bookings);

        return newBooking;
    }

    // 2. Obtener una reserva por ID
    async getBookingById(id) {
        const bookings = await this.#readBookings();
        return bookings.find(b => String(b.id) === String(id)) || null;
    }

    // 3. Agregar un servicio a una reserva (valida existencias e incrementa cantidad)
    async addServiceToBooking(bookingId, serviceId) {
        // Validar que el servicio realmente exista usando ServiceManager
        const serviceExists = await this.serviceManager.getServiceById(serviceId);
        if (!serviceExists) {
            return { error: 'SERVICE_NOT_FOUND' };
        }

        const bookings = await this.#readBookings();
        const bookingIndex = bookings.findIndex(b => String(b.id) === String(bookingId));

        if (bookingIndex === -1) {
            return { error: 'BOOKING_NOT_FOUND' };
        }

        const booking = bookings[bookingIndex];

        // Verificar si el servicio ya estaba en la reserva
        const existingServiceIndex = booking.services.findIndex(
            s => String(s.service) === String(serviceId)
        );

        if (existingServiceIndex !== -1) {
            // Si ya existía, incrementamos la cantidad
            booking.services[existingServiceIndex].quantity += 1;
        } else {
            // Si no existía, lo agregamos con quantity: 1
            booking.services.push({
                service: serviceId,
                quantity: 1
            });
        }

        bookings[bookingIndex] = booking;
        await this.#writeBookings(bookings);

        return booking;
    }
}