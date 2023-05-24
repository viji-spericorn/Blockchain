const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const disease = sequelize.define('disease', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  diseaseName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  remarks: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
  },
});

disease.associate = (models) => {
  disease.belongsTo(models.user, { foreignKey: 'userId', allowNull: false });
};

module.exports = disease;
