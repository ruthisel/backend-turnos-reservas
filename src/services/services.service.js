import crypto from 'crypto';
import { ServicesRepository } from '../repositories/services.repository.js';

export class ServicesService {
    constructor() {
        this.servicesRepository = new ServicesRepository();
    }

    async getServices(filters = {}) {
        let services = await this.servicesRepository.getAll();

        if (filters.category) {
            services = services.filter(
                s => s.category.toLowerCase() === filters.category.toLowerCase()
            );
        }

        if (filters.available !== undefined) {
            const isAvailable = filters.available === 'true';
            services = services.filter(s => s.available === isAvailable);
        }

        return services;
    }

    async getServiceById(id) {
        return await this.servicesRepository.getById(id);
    }

    async createService(serviceData) {
        const { name, description, duration, price, category, available, targetAudience, professionals } = serviceData;

        if (!name || !description || duration === undefined || price === undefined || !category || available === undefined) {
            return null;
        }

        const newService = {
            id: crypto.randomUUID(),
            name,
            description,
            duration: Number(duration),
            price: Number(price),
            category,
            available: Boolean(available),
            targetAudience: targetAudience || 'Infancias, Adolescentes y Adultos',
            professionals: professionals || []
        };

        return await this.servicesRepository.create(newService);
    }

    async updateService(id, updatedData) {
        return await this.servicesRepository.update(id, updatedData);
    }

    async deleteService(id) {
        return await this.servicesRepository.delete(id);
    }
}