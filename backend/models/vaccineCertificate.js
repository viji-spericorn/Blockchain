const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const vaccineCertification = sequelize.define('vaccineCertification', {
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
  patientName: { type: DataTypes.STRING, allowNull: false },
  patientUUID: { type: DataTypes.STRING, allowNull: false },
  patientRegId: { type: DataTypes.STRING, allowNull: false },
  vaccineTakenDatetime: { type: DataTypes.STRING, allowNull: false },
  vaccineName: { type: DataTypes.STRING, allowNull: false },
  disease: { type: DataTypes.STRING, allowNull: false },
  antigen: { type: DataTypes.STRING, allowNull: false },
  issuerName: { type: DataTypes.STRING, allowNull: false },
  issuerId: { type: DataTypes.STRING, allowNull: false },
  issuedDateTime: { type: DataTypes.STRING, allowNull: false },
});

vaccineCertification.associate = (models) => {
  vaccineCertification.belongsTo(models.transaction, {
    foreignKey: 'transactionId',
    allowNull: false,
  });
};

module.exports = vaccineCertification;
