const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Importamos los modelos pasando la instancia de sequelize
const UserModel = require('./user');
const OrderModel = require('./order');

const User = UserModel(sequelize);
const Order = OrderModel(sequelize);

// --- RELACIONES (1:N) ---
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
    sequelize,
    User,
    Order
};