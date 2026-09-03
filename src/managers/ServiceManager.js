import fs from 'fs/promises';
import crypto from 'crypto';

const PATH = './src/data/services.json';

export class ServiceManager {
    
    // Método privado para leer el archivo JSON
    async #readServices() {
        try {
            const data = await fs.readFile(PATH, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return []; // Si no existe o está vacío, devuelve vacío
        }
    }

    // Método priv para escribir en el archivo JSON
    async #writeServices(services) {
        await fs.writeFile(PATH, JSON.stringify(services, null, 2));
    }

    // 1. Obtener todos los servicios
    async getServices() {
        return await this.#readServices();
    }

    // 2. Obtener un servicio por ID
    async getServiceById(id) {
        const services = await this.#readServices();
        const service = services.find(s => s.id === id);
        if (!service) {
            return null; // Devuelve null si no existe
        }
        return service;
    }

    // 3. Agregar un servicio (valida campos y genera ID automáticamente)
    async addService(serviceData) {
        const { name, description, duration, price, category, available } = serviceData;

        // Validar que estén presentes todos los campos obligatorios
        if (!name || !description || duration === undefined || price === undefined || !category || available === undefined) {
            console.log("❌ Error: Faltan campos obligatorios.");
            return null;
        }

        const services = await this.#readServices();

        const newService = {
            id: crypto.randomUUID(), // Se genera automáticamente, no se recibe de afuera
            name,
            description,
            duration,
            price,
            category,
            available
        };

        services.push(newService);
        await this.#writeServices(services);
        
        return newService;
    }

    // 4. Actualizar un servicio (no permite modificar el ID)
    async updateService(id, updatedData) {
        const services = await this.#readServices();
        const index = services.findIndex(s => s.id === id);

        if (index === -1) {
            return null; // Devuelve null si no existe
        }

        // Evitamos que intenten modificar el id
        delete updatedData.id;

        services[index] = {
            ...services[index],
            ...updatedData
        };

        await this.#writeServices(services);
        return services[index];
    }

    // 5. Eliminar un servicio
    async deleteService(id) {
        const services = await this.#readServices();
        const exists = services.some(s => s.id === id);

        if (!exists) {
            return null; // Devuelve null si no existe
        }

        const filteredServices = services.filter(s => s.id !== id);
        await this.#writeServices(filteredServices);
        
        return { message: "Servicio eliminado", id };
    }
}