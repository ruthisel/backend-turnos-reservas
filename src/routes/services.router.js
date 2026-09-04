import { Router } from 'express';
import { ServiceManager } from '../managers/ServiceManager.js';

const router = Router();
const serviceManager = new ServiceManager();

// GET /api/services - Obtiene todos los servicios (Acepta filtros por query: ?category=psicologia&available=true)
router.get('/', async (req, res) => {
    try {
        const { category, available } = req.query;
        const services = await serviceManager.getServices({ category, available });
        res.status(200).json({ status: 'success', payload: services });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// GET /api/services/:sid - Obtiene un servicio por su ID (:sid)
router.get('/:sid', async (req, res) => {
    try {
        const { sid } = req.params;
        const service = await serviceManager.getServiceById(sid);

        if (!service) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
        }

        res.status(200).json({ status: 'success', payload: service });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// POST /api/services - Crea un nuevo servicio
router.post('/', async (req, res) => {
    try {
        const newService = await serviceManager.addService(req.body);

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
});

// PUT /api/services/:sid - Actualiza un servicio existente (sin modificar el id)
router.put('/:sid', async (req, res) => {
    try {
        const { sid } = req.params;
        const updatedService = await serviceManager.updateService(sid, req.body);

        if (!updatedService) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado para actualizar' });
        }

        res.status(200).json({ status: 'success', payload: updatedService });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// DELETE /api/services/:sid - Elimina un servicio por ID
router.delete('/:sid', async (req, res) => {
    try {
        const { sid } = req.params;
        const result = await serviceManager.deleteService(sid);

        if (!result) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado para eliminar' });
        }

        res.status(200).json({ status: 'success', message: 'Servicio eliminado correctamente', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

export default router;