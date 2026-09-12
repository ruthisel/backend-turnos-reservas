import { ServicesDAO } from '../dao/services.dao.js';

const servicesDAO = new ServicesDAO();

export class ServicesService {
    async getServices(queryParams = {}) {
        const { category, available, page, limit, sortBy, order } = queryParams;
        const filter = {};

        if (category) filter.category = category;
        if (available !== undefined) filter.available = available === 'true';

        return await servicesDAO.getAll(filter, { page, limit, sortBy, order });
    }

    async getServiceById(id) {
        return await servicesDAO.getById(id);
    }

    async createService(data) {
        return await servicesDAO.create(data);
    }

    async updateService(id, data) {
        return await servicesDAO.update(id, data);
    }

    async deleteService(id) {
        return await servicesDAO.delete(id);
    }
}