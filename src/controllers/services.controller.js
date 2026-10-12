import { ServicesService } from '../services/services.service.js';

const servicesService = new ServicesService();

export const getServices = async (req, res, next) => {
    try {
        const result = await servicesService.getServices(req.query);
        res.json({
            status: 'success',
            payload: result.docs,
            totalDocs: result.totalDocs,
            limit: result.limit,
            totalPages: result.totalPages,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage
        });
    } catch (error) {
        next(error);
    }
};

export const getServiceById = async (req, res, next) => {
    try {
        const service = await servicesService.getServiceById(req.params.id);
        if (!service) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
        }
        res.json({ status: 'success', payload: service });
    } catch (error) {
        next(error);
    }
};

export const createService = async (req, res, next) => {
    try {
        const newService = await servicesService.createService(req.body);
        res.status(201).json({ status: 'success', payload: newService });
    } catch (error) {
        next(error);
    }
};

export const updateService = async (req, res, next) => {
    try {
        const updated = await servicesService.updateService(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
        }
        res.json({ status: 'success', payload: updated });
    } catch (error) {
        next(error);
    }
};

export const deleteService = async (req, res, next) => {
    try {
        const deleted = await servicesService.deleteService(req.params.id);
        if (!deleted) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
        }
        res.json({ status: 'success', message: 'Servicio eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};