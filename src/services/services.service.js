import { ServicesRepository } from '../repositories/services.repository.js';

const servicesRepository = new ServicesRepository();

export class ServicesService {
    async getServices(queryParams = {}) {
        const { category, available, page, limit, sortBy, order } = queryParams;
        const filter = {};

        if (category) filter.category = category;
        if (available !== undefined) filter.available = available === 'true';

        return await servicesRepository.getAll(filter, { page, limit, sortBy, order });
    }

    async getServiceById(id) {
        return await servicesRepository.getById(id);
    }

    async createService(data) {
        return await servicesRepository.create(data);
    }

    async updateService(id, data) {
        return await servicesRepository.update(id, data);
    }

    async deleteService(id) {
        return await servicesRepository.delete(id);
    }
}