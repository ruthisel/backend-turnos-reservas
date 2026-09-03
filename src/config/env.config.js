import dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV
};

// Patrón Fail-Fast: Si falta alguna variable crítica, la app frena y avisa
if (!envConfig.port || !envConfig.nodeEnv) {
    console.error("❌ Error crítico: Faltan variables de entorno obligatorias.");
    process.exit(1);
}