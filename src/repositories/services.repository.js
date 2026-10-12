import { ServicesDAO } from '../dao/services.dao.js';

const servicesDAO = new ServicesDAO();

export class ServicesRepository {
    async getAll(filter, options) {
        return await servicesDAO.getAll(filter, options);
    }

    async getById(id) {
        return await servicesDAO.getById(id);
    }

    async create(data) {
        return await servicesDAO.create(data);
    }

    async update(id, data) {
        return await servicesDAO.update(id, data);
    }

    async delete(id) {
        return await servicesDAO.delete(id);
    }
}