import mongoose from 'mongoose';
import dns from 'dns';
import { envConfig } from './env.config.js';

// Forzar a Node.js a usar los servidores DNS públicos de Google/Cloudflare
dns.setServers(['8.8.8.8', '1.1.1.1']);

export const connectDB = async () => {
    try {
        await mongoose.connect(envConfig.mongoUri, {
            family: 4,
            serverSelectionTimeoutMS: 5000
        });
        console.log(' Conexión a MongoDB Atlas establecida con éxito');
    } catch (error) {
        console.error(' Error al conectar con MongoDB Atlas:', error.message);
        process.exit(1);
    }
};