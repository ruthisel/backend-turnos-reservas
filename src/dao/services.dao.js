import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = './src/data';
const FILE_PATH = path.join(DATA_DIR, 'services.json');

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
        professionals: ["Lic. Roberta Bañuelos", "Lic. Alejandra Martini", "Lic. Florencia Semper Diaz"]
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

export class ServicesDAO {
    async #ensureFileExists() {
        try {
            await fs.mkdir(DATA_DIR, { recursive: true });
            await fs.access(FILE_PATH);
        } catch (error) {
            await fs.writeFile(FILE_PATH, JSON.stringify(INITIAL_SERVICES, null, 2), 'utf-8');
        }
    }

    async getAll() {
        await this.#ensureFileExists();
        try {
            const data = await fs.readFile(FILE_PATH, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getById(id) {
        const services = await this.getAll();
        return services.find(s => String(s.id) === String(id)) || null;
    }

    async create(serviceData) {
        const services = await this.getAll();
        services.push(serviceData);
        await fs.writeFile(FILE_PATH, JSON.stringify(services, null, 2), 'utf-8');
        return serviceData;
    }

    async update(id, updatedData) {
        const services = await this.getAll();
        const index = services.findIndex(s => String(s.id) === String(id));
        if (index === -1) return null;

        delete updatedData.id;
        services[index] = { ...services[index], ...updatedData };

        await fs.writeFile(FILE_PATH, JSON.stringify(services, null, 2), 'utf-8');
        return services[index];
    }

    async delete(id) {
        const services = await this.getAll();
        const exists = services.some(s => String(s.id) === String(id));
        if (!exists) return null;

        const filtered = services.filter(s => String(s.id) !== String(id));
        await fs.writeFile(FILE_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
        return true;
    }
}