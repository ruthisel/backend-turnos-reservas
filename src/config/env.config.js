import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV || 'development'
};

// Patrón Fail-Fast
if (!envConfig.port || !envConfig.nodeEnv) {
    console.error("❌ Error crítico: Faltan variables de entorno obligatorias.");
    process.exit(1);
}