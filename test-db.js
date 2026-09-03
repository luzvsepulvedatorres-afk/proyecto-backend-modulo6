const sequelize = require('./config/database');

async function probarConexion() {
  try {
    await sequelize.authenticate();
    console.log('¡Conexión establecida con éxito! La base de datos SQLite está lista.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

probarConexion();