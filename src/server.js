import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { envConfig } from './config/env.config.js';
import { connectDB } from './config/database.config.js';
import { ServicesService } from './services/services.service.js';

const server = http.createServer(app);
const io = new Server(server);
const servicesService = new ServicesService();

// Configuración de WebSockets en tiempo real
io.on('connection', (socket) => {
    console.log('Cliente conectado vía WebSocket:', socket.id);

    socket.on('newService', async (serviceData) => {
        try {
            await servicesService.createService(serviceData);
            const updatedServices = await servicesService.getServices();
            io.emit('servicesUpdated', updatedServices);
        } catch (error) {
            console.error('Error al crear servicio vía socket:', error.message);
        }
    });
});

const startServer = async () => {
    await connectDB();
    server.listen(envConfig.port, () => {
        console.log(`Servidor corriendo en http://localhost:${envConfig.port} (Modo: ${envConfig.nodeEnv})`);
    });
};

startServer();