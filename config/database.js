const { Sequelize } = require('sequelize');
const path = require('path');

// Configuración de Sequelize usando SQLite (guarda la base de datos en un archivo local llamado database.sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false
});

module.exports = sequelize;