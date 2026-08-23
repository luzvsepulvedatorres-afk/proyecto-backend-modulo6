// Lógica para el estado de la API
const getStatus = (req, res) => {
    res.json({
        status: 'success',
        module: 'Módulo 6 - Backend',
        timestamp: new Date(),
        uptime: process.uptime()
    });
};

// Lógica para un mensaje general
const getApiHome = (req, res) => {
    res.send('Servidor modularizado funcionando correctamente.');
};

module.exports = {
    getStatus,
    getApiHome
};