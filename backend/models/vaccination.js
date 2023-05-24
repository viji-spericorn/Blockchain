const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const vaccination = sequelize.define('vaccination', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  vaccineId: {
    type: DataTypes.UUID,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('taken', 'notTaken', 'cancel'),
    defaultValue: 'notTaken',
    allowNull: true,
  },
  userId: {
    type: DataTypes.UUID,
  },
  transactionId: {
    type: DataTypes.UUID,
  },
  hospitalId: {
    type: DataTypes.UUID,
  },
});

vaccination.associate = (models) => {
  vaccination.belongsTo(models.user, {
    foreignKey: 'userId',
    allowNull: false,
  });
  vaccination.belongsTo(models.transaction, {
    foreignKey: 'transactionId',
    allowNull: false,
  });
  vaccination.belongsTo(models.vaccine, {
    foreignKey: 'vaccineId',
    allowNull: false,
  });
  vaccination.belongsTo(models.hospital, {
    foreignKey: 'hospitalId',
    allowNull: false,
  });
};

module.exports = vaccination;
