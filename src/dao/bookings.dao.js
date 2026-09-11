import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = './src/data';
const FILE_PATH = path.join(DATA_DIR, 'bookings.json');

export class BookingsDAO {
    async #ensureFileExists() {
        try {
            await fs.mkdir(DATA_DIR, { recursive: true });
            await fs.access(FILE_PATH);
        } catch (error) {
            await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
        }
    }

    async getAll() {
        await this.#ensureFileExists();
        try {
            const data = await fs.readFile(FILE_PATH, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getById(id) {
        const bookings = await this.getAll();
        return bookings.find(b => String(b.id) === String(id)) || null;
    }

    async create(bookingData) {
        const bookings = await this.getAll();
        bookings.push(bookingData);
        await fs.writeFile(FILE_PATH, JSON.stringify(bookings, null, 2), 'utf-8');
        return bookingData;
    }

    async update(id, updatedBooking) {
        const bookings = await this.getAll();
        const index = bookings.findIndex(b => String(b.id) === String(id));
        if (index === -1) return null;

        bookings[index] = updatedBooking;
        await fs.writeFile(FILE_PATH, JSON.stringify(bookings, null, 2), 'utf-8');
        return bookings[index];
    }
}