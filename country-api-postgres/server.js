const express = require('express');
const cors = require('cors');
const countryRoutes = require('./routes/countryRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/countries', countryRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('API de Países funcionando correctamente con PostgreSQL');
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`API disponible en: http://localhost:${PORT}/api/countries`);
});

// Manejar errores del servidor
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(` Puerto ${PORT} ya está en uso`);
  } else {
    console.error(' Error del servidor:', error);
  }
});

// Manejar cierre del proceso
process.on('SIGINT', () => {
  console.log('\n Cerrando servidor...');
  server.close(() => {
    console.log(' Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n Cerrando servidor...');
  server.close(() => {
    console.log(' Servidor cerrado correctamente');
    process.exit(0);
  });
});

// Manejar errores no capturados
process.on('uncaughtException', (error) => {
  console.error(' Error no capturado:', error);
  // No cerrar el proceso, solo registrar el error
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(' Promesa rechazada no manejada:', reason);
  // No cerrar el proceso, solo registrar el error
});