import { ServiceModel } from './models/service.model.js';

export class ServicesDAO {
    async getAll(filter = {}, options = {}) {
        const { page = 1, limit = 10, sortBy = 'createdAt', order = 'asc' } = options;
        const sortOrder = order === 'desc' ? -1 : 1;

        const paginateOptions = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: { [sortBy]: sortOrder },
            lean: true
        };

        return await ServiceModel.paginate(filter, paginateOptions);
    }

    async getById(id) {
        return await ServiceModel.findById(id).lean();
    }

    async create(serviceData) {
        return await ServiceModel.create(serviceData);
    }

    async update(id, updatedData) {
        delete updatedData.id;
        delete updatedData._id;
        return await ServiceModel.findByIdAndUpdate(id, updatedData, { new: true }).lean();
    }

    async delete(id) {
        const deleted = await ServiceModel.findByIdAndDelete(id);
        return deleted ? true : null;
    }
}