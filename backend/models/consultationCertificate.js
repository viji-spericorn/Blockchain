const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const createCertification = sequelize.define('createCertification', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  certificateNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionId: { type: DataTypes.UUID },
  patientName: { type: DataTypes.STRING, allowNull: true },
  patientUUID: { type: DataTypes.STRING, allowNull: true },
  patientRegId: { type: DataTypes.STRING, allowNull: true },
  doctorName: { type: DataTypes.STRING, allowNull: true },
  consultationTime: { type: DataTypes.DATE, allowNull: true },
  departmentName: { type: DataTypes.STRING, allowNull: true },
  hospitalName: { type: DataTypes.STRING, allowNull: true },
  issuerName: { type: DataTypes.STRING, allowNull: true },
  issuerId: { type: DataTypes.STRING, allowNull: true },
  issuedDateTime: { type: DataTypes.DATE, allowNull: true },
});

createCertification.associate = (models) => {
  createCertification.belongsTo(models.transaction, {
    foreignKey: 'transactionId',
    allowNull: true,
  });
};

module.exports = createCertification;
