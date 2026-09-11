import { ServiceModel } from './models/service.model.js';

export class ServicesDAO {
    async getAll() {
        return await ServiceModel.find().lean();
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