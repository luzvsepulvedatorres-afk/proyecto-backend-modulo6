const { User, Order, sequelize } = require('../models');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const usuarios = await User.findAll();
        return res.status(200).json({
            total: usuarios.length,
            usuarios: usuarios
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Crear un usuario normal
const createUser = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const nuevoUsuario = await User.create({ nombre, email, password });
        return res.status(201).json({
            message: 'Usuario creado exitosamente',
            usuario: nuevoUsuario
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(400).json({ message: 'Error al crear usuario', error: error.message });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password } = req.body;

        const usuario = await User.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
        }

        await usuario.update({ nombre, email, password });
        return res.status(200).json({
            message: 'Usuario actualizado exitosamente',
            usuario: usuario
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        return res.status(400).json({ message: 'Error al actualizar usuario', error: error.message });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await User.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
        }

        await usuario.destroy();
        return res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Crear usuario con transacción y rollback de prueba
const createUserWithTransaction = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { nombre, email, password } = req.body;

        // Simulamos un error controlado si el email contiene la palabra 'error'
        if (email && email.includes('error')) {
            throw new Error('Error simulado para probar el rollback de la transacción');
        }

        const nuevoUsuario = await User.create({ nombre, email, password }, { transaction: t });

        await t.commit();
        return res.status(201).json({
            message: 'Usuario creado exitosamente con transacción',
            usuario: nuevoUsuario
        });
    } catch (error) {
        await t.rollback();
        console.error('Transacción fallida, se aplicó rollback:', error.message);
        return res.status(400).json({
            message: 'Transacción fallida, cambios revertidos',
            error: error.message
        });
    }
};

// Crear un pedido asociado a un usuario específico (Relación 1:N)
const createOrderForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { descripcion, monto } = req.body;

        const usuario = await User.findByPk(userId);
        if (!usuario) {
            return res.status(404).json({ message: `Usuario con ID ${userId} no encontrado` });
        }

        const nuevoPedido = await Order.create({
            descripcion,
            monto,
            userId
        });

        return res.status(201).json({
            message: 'Pedido creado y asociado exitosamente',
            pedido: nuevoPedido
        });
    } catch (error) {
        console.error('Error al crear el pedido:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Obtener usuarios con sus pedidos usando include (Relación 1:N)
const getUsersWithOrders = async (req, res) => {
    try {
        const usuariosConPedidos = await User.findAll({
            include: [{
                model: Order,
                as: 'orders'
            }]
        });

        return res.status(200).json({
            total: usuariosConPedidos.length,
            usuarios: usuariosConPedidos
        });
    } catch (error) {
        console.error('Error al obtener usuarios con pedidos:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};
// 2. Obtener los pedidos de UN USUARIO ESPECÍFICO por su ID (Esta es la que complementa la pauta)
const getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const usuario = await User.findByPk(userId, {
            include: [{
                model: Order,
                as: 'orders'
            }]
        });

        if (!usuario) {
            return res.status(404).json({ message: `Usuario con ID ${userId} no encontrado` });
        }

        return res.status(200).json({
            usuarioId: usuario.id,
            nombre: usuario.nombre,
            pedidos: usuario.orders
        });
    } catch (error) {
        console.error('Error al obtener los pedidos del usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    createUserWithTransaction,
    createOrderForUser,
    getUsersWithOrders,
    getOrdersByUser
};