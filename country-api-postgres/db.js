const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'bdpaises',
  port: process.env.DB_PORT || 5432,
  max: 10, // máximo número de clientes en el pool
});

// Función para verificar la conexión
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Conexión a PostgreSQL establecida con éxito');
    client.release();
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error);
    // No salir del proceso, solo mostrar el error
  }
}

// Verificar la conexión al iniciar
testConnection();

// Manejar errores del pool
pool.on('error', (err) => {
  console.error('Error inesperado en el pool de conexiones:', err);
});

module.exports = pool;