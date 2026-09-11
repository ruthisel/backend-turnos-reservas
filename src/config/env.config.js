import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
    port: Number(process.env.PORT) || 8080,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI
};

// Patrón Fail-Fast: valida que existan las variables obligatorias al arrancar
if (!envConfig.port || !envConfig.nodeEnv || !envConfig.mongoUri) {
    console.error("❌ Error crítico: Faltan variables de entorno obligatorias (PORT, NODE_ENV, MONGO_URI).");
    process.exit(1);
}