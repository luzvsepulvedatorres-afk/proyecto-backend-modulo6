const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        monto: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        tableName: 'orders',
        timestamps: true
    });

    return Order;
};
