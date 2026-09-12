import { z } from 'zod';

export const serviceSchema = z.object({
    name: z.string({ required_error: 'El nombre es obligatorio' }).min(3),
    description: z.string({ required_error: 'La descripción es obligatoria' }),
    duration: z.number({ required_error: 'La duración debe ser un número' }).positive(),
    price: z.number({ required_error: 'El precio debe ser un número positivo' }).positive(),
    category: z.string({ required_error: 'La categoría es obligatoria' }),
    available: z.boolean().optional(),
    targetAudience: z.string().optional(),
    professionals: z.array(z.string()).optional()
});

export const bookingSchema = z.object({
    clientName: z.string({ required_error: 'El nombre del cliente es obligatorio' }),
    clientEmail: z.string().email({ message: 'Email inválido' }),
    date: z.string({ required_error: 'La fecha es obligatoria' }),
    time: z.string({ required_error: 'La hora es obligatoria' }),
    services: z.array(
        z.object({
            service: z.string({ required_error: 'El ID del servicio es requerido' }),
            quantity: z.number().int().positive().optional()
        })
    ).optional()
});

export const validateBody = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                status: 'error',
                message: 'Error de validación de datos',
                errors: error.errors.map((e) => ({ field: e.path.join('.'), message: e.message }))
            });
        }
        next(error);
    }
};