const department = require('../department');
const sequelize = require('../../config/db');

const departments = [
  { name: 'Emergency Department', departmentId: 1 },
  { name: 'Intensive Care Unit', departmentId: 2 },
  { name: 'General Medicine', departmentId: 3 },
  { name: 'Surgery Department', departmentId: 4 },
  { name: 'Pediatrics Department', departmentId: 5 },
  { name: 'Obstetrics and Gynecology ', departmentId: 6 },
  { name: 'Radiology Department', departmentId: 7 },
  { name: 'Laboratory Services', departmentId: 8 },
  { name: 'Pharmacy', departmentId: 9 },
  { name: 'Physical Therapy and Rehabilitation', departmentId: 10 },
];

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');

    await sequelize.sync({ force: false });
    console.log('Database synced');

    // Check if data exists in the database
    for (const eachData of departments) {
      const data = await department.findOne({
        where: {
          departmentId: eachData.departmentId,
          name: eachData.name,
        },
      });

      if (!data) {
        // Insert data into the database
        const user = await department.bulkCreate(departments);

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
