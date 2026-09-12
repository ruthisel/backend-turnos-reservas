import { Router } from 'express';
import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from '../controllers/services.controller.js';
import { validateBody, serviceSchema } from '../middlewares/validation.middleware.js';

const router = Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', validateBody(serviceSchema), createService);
router.put('/:id', validateBody(serviceSchema.partial()), updateService);
router.delete('/:id', deleteService);

export default router;