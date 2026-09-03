const express = require('express');
const router = express.Router();
const { 
    createUser, 
    getUsers, 
    updateUser, 
    deleteUser,
    createUserWithTransaction,
    createOrderForUser,
    getUsersWithOrders,
    getOrdersByUser
} = require('../controllers/userController');

// Ruta para obtener todos los usuarios (GET)
router.get('/usuarios', getUsers);

// Ruta para obtener todos los usuarios con sus pedidos (GET - Relación 1:N)
router.get('/usuarios/pedidos', getUsersWithOrders);

// Ruta para obtener los pedidos de un usuario específico (GET - Relación 1:N)
router.get('/usuarios/:userId/pedidos', getOrdersByUser);

// Ruta para crear un usuario normal (POST)
router.post('/usuarios', createUser);

// Ruta para crear un usuario con transacción y rollback (POST)
router.post('/usuarios/transaccion', createUserWithTransaction);

// Ruta para crear un pedido para un usuario específico (POST - Relación 1:N)
router.post('/usuarios/:userId/pedidos', createOrderForUser);

// Ruta para actualizar un usuario por ID (PUT)
router.put('/usuarios/:id', updateUser);

// Ruta para eliminar un usuario por ID (DELETE)
router.delete('/usuarios/:id', deleteUser);

module.exports = router;