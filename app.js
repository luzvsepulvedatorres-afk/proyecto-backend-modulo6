const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Importamos las rutas modulares
const appRoutes = require('./routes/appRoutes');

// Importamos la base de datos y modelos (Módulo 7)
const sequelize = require('./config/database');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares globales ---
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Importar las rutas de usuario
const userRoutes = require('./routes/userRoutes');

// Usar las rutas (puedes agregar un prefijo como /api si lo deseas, o usarlas directamente)
app.use('/api', userRoutes);
// O directamente: app.use(userRoutes);

// Middleware de Logs (Persistencia en archivos planos)
app.use((req, res, next) => {
    const now = new Date().toISOString();
    const logEntry = `[${now}] Método: ${req.method} - Ruta: ${req.url}\n`;

    fs.appendFile(path.join(__dirname, 'logs', 'log.txt'), logEntry, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de log:', err);
        }
    });

    next();
});

// --- Montaje de Rutas ---
// Prefijo /api para todas las rutas del módulo
app.use('/api', appRoutes);

// --- Manejador 404 ---
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        status: 404
    });
});

// --- Sincronizar Base de Datos y Levantar Servidor ---
sequelize.sync() // Esto crea automáticamente la tabla 'usuarios' en database.sqlite si no existe
    .then(() => {
        console.log('Base de datos sincronizada correctamente.');
        app.listen(PORT, () => {
            console.log(`Servidor modular ejecutándose en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });