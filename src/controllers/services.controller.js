import { ServicesService } from '../services/services.service.js';

const servicesService = new ServicesService();

export const getServices = async (req, res) => {
    try {
        const filters = req.query;
        const services = await servicesService.getServices(filters);
        res.status(200).json({ status: 'success', payload: services });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const { sid } = req.params;
        const service = await servicesService.getServiceById(sid);

        if (!service) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
        }

        res.status(200).json({ status: 'success', payload: service });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
};

export const createService = async (req, res) => {
    try {
        const newService = await servicesService.createService(req.body);

        if (!newService) {
            return res.status(400).json({
                status: 'error',
                message: 'Faltan campos obligatorios (name, description, duration, price, category, available)'
            });
        }

        res.status(201).json({ status: 'success', payload: newService });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
};

export const updateService = async (req, res) => {
    try {
        const { sid } = req.params;
        const updatedService = await servicesService.updateService(sid, req.body);

        if (!updatedService) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
        }

        res.status(200).json({ status: 'success', payload: updatedService });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
};

export const deleteService = async (req, res) => {
    try {
        const { sid } = req.params;
        const result = await servicesService.deleteService(sid);

        if (!result) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
        }

        res.status(200).json({ status: 'success', message: 'Servicio eliminado correctamente', id: sid });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
};