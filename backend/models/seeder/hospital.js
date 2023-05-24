const hospital = require('../hospital');
const sequelize = require('../../config/db');

const hospitals = [
  { name: 'City General Hospital', hospitalId: 1 },
  { name: 'Summit Health Hospital', hospitalId: 2 },
  { name: 'Coastal Medical Center', hospitalId: 3 },
  { name: 'Central Regional Medical Center', hospitalId: 4 },
  { name: 'Vcare Medical Center', hospitalId: 5 },
];

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');

    await sequelize.sync({ force: false });
    console.log('Database synced');

    // Check if data exists in the database
    for (const eachData of hospitals) {
      const data = await hospital.findOne({
        where: {
          hospitalId: eachData.hospitalId,
          name: eachData.name,
        },
      });

      if (!data) {
        // Insert data into the database
        const user = await hospital.bulkCreate(hospitals);

        console.log('Data inserted');
      } else {
        console.log('Data already exists, skipping insertion');
      }
    }

    sequelize.close();
  } catch (error) {
    console.error(error.message);
  }
};

seed();
