import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = './src/data';
const FILE_PATH = path.join(DATA_DIR, 'services.json');

// Datos por defecto del Centro Interdisciplinario para inicializar si el archivo no existe
const INITIAL_SERVICES = [
  {
    id: "1",
    name: "Acompañamiento Psicológico",
    description: "Atención integral personalizada para infancias, adolescentes y adultos.",
    duration: 45,
    price: 5000,
    category: "psicologia",
    available: true,
    targetAudience: "Infancias, Adolescentes y Adultos",
    professionals: ["Lic. Roberta Bañuelos", "Lic. Alejandra Martini", "Lic. Florencia Samper Diaz"]
  },
  {
    id: "2",
    name: "Evaluación y Diagnóstico Psicopedagógico",
    description: "Abordaje de procesos de aprendizaje.",
    duration: 50,
    price: 6000,
    category: "psicopedagogia",
    available: true,
    targetAudience: "Infancias y Adolescentes",
    professionals: ["Lic. Maria Noelia Pierini", "Lic. Tania Yasmin Dominguez", "Paula Carranza"]
  },
  {
    id: "3",
    name: "Evaluación Fonoaudiológica",
    description: "Diagnóstico y tratamiento del lenguaje y la comunicación.",
    duration: 45,
    price: 5500,
    category: "fonoaudiologia",
    available: true,
    targetAudience: "Infancias",
    professionals: ["Lic. Luciana Kufner"]
  },
  {
    id: "4",
    name: "Estimulación Visual y Educación Especial",
    description: "Acompañamiento pedagógico adaptado y desarrollo de habilidades visuales.",
    duration: 45,
    price: 5500,
    category: "educacion_especial",
    available: true,
    targetAudience: "Infancias y Adolescentes",
    professionals: ["Lic. Natalia Barrionuevo"]
  },
  {
    id: "5",
    name: "Consulta Médica Integral",
    description: "Atención clínica preventiva y de seguimiento.",
    duration: 30,
    price: 7000,
    category: "medicina",
    available: true,
    targetAudience: "General",
    professionals: ["Dra. Nadia Dolcemáscolo"]
  },
  {
    id: "6",
    name: "Nutrición y Hábitos Saludables",
    description: "Planes alimentarios integrales.",
    duration: 45,
    price: 5000,
    category: "nutricion",
    available: true,
    targetAudience: "Adolescentes y Adultos",
    professionals: ["Lic. Luciana Caricati"]
  },
  {
    id: "7",
    name: "Sesión de Psicomotricidad",
    description: "Acompañamiento del desarrollo corporal y motriz.",
    duration: 45,
    price: 5200,
    category: "psicomotricidad",
    available: true,
    targetAudience: "Infancias",
    professionals: ["Lic. Abril Sarobe"]
  }
];

export class ServiceManager {

    // Método privado para asegurar que la carpeta y el archivo existan automáticamente
    async #ensureFileExists() {
        try {
            await fs.mkdir(DATA_DIR, { recursive: true });
            await fs.access(FILE_PATH);
        } catch (error) {
            // Si el archivo o carpeta no existen, se crean con los datos iniciales
            await fs.writeFile(FILE_PATH, JSON.stringify(INITIAL_SERVICES, null, 2), 'utf-8');
        }
    }

    // Método privado para leer el archivo JSON
    async #readServices() {
        await this.#ensureFileExists();
        try {
            const data = await fs.readFile(FILE_PATH, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    // Método privado para escribir en el archivo JSON
    async #writeServices(services) {
        await this.#ensureFileExists();
        await fs.writeFile(FILE_PATH, JSON.stringify(services, null, 2), 'utf-8');
    }

    // 1. Obtener todos los servicios (con soporte para filtros ?category=... &available=...)
    async getServices(filters = {}) {
        let services = await this.#readServices();

        if (filters.category) {
            services = services.filter(s => s.category.toLowerCase() === filters.category.toLowerCase());
        }

        if (filters.available !== undefined) {
            const isAvailable = filters.available === 'true';
            services = services.filter(s => s.available === isAvailable);
        }

        return services;
    }

    // 2. Obtener un servicio por ID
    async getServiceById(id) {
        const services = await this.#readServices();
        return services.find(s => String(s.id) === String(id)) || null;
    }

    // 3. Agregar un servicio (valida campos y genera ID automáticamente)
    async addService(serviceData) {
        const { name, description, duration, price, category, available, professionals, targetAudience } = serviceData;

        // Validar campos obligatorios
        if (!name || !description || duration === undefined || price === undefined || !category || available === undefined) {
            console.log("❌ Error: Faltan campos obligatorios.");
            return null;
        }

        const services = await this.#readServices();

        const newService = {
            id: crypto.randomUUID(),
            name,
            description,
            duration: Number(duration),
            price: Number(price),
            category,
            available: Boolean(available),
            targetAudience: targetAudience || 'Infancias, Adolescentes y Adultos',
            professionals: professionals || []
        };

        services.push(newService);
        await this.#writeServices(services);
        
        return newService;
    }

    // 4. Actualizar un servicio (no permite modificar el ID)
    async updateService(id, updatedData) {
        const services = await this.#readServices();
        const index = services.findIndex(s => String(s.id) === String(id));

        if (index === -1) {
            return null;
        }

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
        const exists = services.some(s => String(s.id) === String(id));

        if (!exists) {
            return null;
        }

        const filteredServices = services.filter(s => String(s.id) !== String(id));
        await this.#writeServices(filteredServices);
        
        return { message: "Servicio eliminado", id };
    }
}