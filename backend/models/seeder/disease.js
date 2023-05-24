const disease = require('../diseaseNames');
const sequelize = require('../../config/db');

// Define the data to be inserted
const diseaseDetails = [
  { name: 'Viral Fever' },
  { name: 'Diabetes' },
  { name: 'Hypertension' },
  { name: 'Kidney disease' },
  { name: 'Stroke' },
  { name: 'Allergies' },
  { name: 'Heart disease' },
  { name: 'Migraine' },
  { name: 'Cancer' },
  { name: 'Depression' },
  { name: 'Tuberculosis' },
  { name: 'Thyroid disorder' },
  { name: 'Alzheimer' },
  { name: 'HIV/AIDS' },
  { name: 'Chickenpox' },
];

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');

    await sequelize.sync({ force: false });
    console.log('Database synced');

    // Check if data exists in the database
    for (const eachData of diseaseDetails) {
      const data = await disease.findOne({
        where: {
          name: eachData.name,
        },
      });

      if (!data) {
        // Insert data into the database
        const user = await disease.bulkCreate(diseaseDetails);

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
