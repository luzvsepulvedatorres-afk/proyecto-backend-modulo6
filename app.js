const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Importamos las rutas modulares
const appRoutes = require('./routes/appRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares globales ---
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

// --- Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor modular ejecutándose en http://localhost:${PORT}`);
});