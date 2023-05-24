const doctors = require('../doctor');
const sequelize = require('../../config/db');

const doctor = [
  {
    name: 'Dr. Jonathan Clarke',
    departmentId: 1,
    hospitalId: 1,
  },
  {
    name: 'Dr. Natalie Roberts',
    departmentId: 2,
    hospitalId: 1,
  },
  {
    name: 'Dr. Michael Ramirez',
    departmentId: 3,
    hospitalId: 1,
  },
  {
    name: 'Dr. Elizabeth Patel',
    departmentId: 4,
    hospitalId: 1,
  },
  {
    name: 'Dr. Benjamin Wilson',
    departmentId: 5,
    hospitalId: 1,
  },
  {
    name: 'Dr. Ava Lewis',
    departmentId: 6,
    hospitalId: 1,
  },
  {
    name: 'Dr. Ethan Johnson',
    departmentId: 7,
    hospitalId: 1,
  },
  {
    name: 'Dr. Grace Roberts',
    departmentId: 8,
    hospitalId: 1,
  },
  {
    name: 'Dr. Samuel Anderson',
    departmentId: 9,
    hospitalId: 1,
  },
  {
    name: 'Dr. Isabella Foster',
    departmentId: 10,
    hospitalId: 1,
  },
  {
    name: 'Dr. Christopher Bennett',
    departmentId: 1,
    hospitalId: 2,
  },
  {
    name: 'Dr. Sophia Carter',
    departmentId: 2,
    hospitalId: 2,
  },
  {
    name: 'Dr. Matthew Evans',
    departmentId: 3,
    hospitalId: 2,
  },
  {
    name: 'Dr. Olivia Reynolds',
    departmentId: 4,
    hospitalId: 2,
  },
  {
    name: 'Dr. Jacob Thompson',
    departmentId: 5,
    hospitalId: 2,
  },
  {
    name: 'Dr. Emily Sullivan',
    departmentId: 6,
    hospitalId: 2,
  },
  {
    name: 'Dr. Daniel Mitchell',
    departmentId: 7,
    hospitalId: 2,
  },
  {
    name: 'Dr. Gabriella Rivera',
    departmentId: 8,
    hospitalId: 2,
  },
  {
    name: 'Dr. Alexander Hayes',
    departmentId: 9,
    hospitalId: 2,
  },
  {
    name: 'Dr. Victoria Morgan',
    departmentId: 10,
    hospitalId: 2,
  },
  {
    name: 'Dr. Olivia Mitchel',
    departmentId: 1,
    hospitalId: 3,
  },
  {
    name: 'Dr. Benjamin Foster',
    departmentId: 2,
    hospitalId: 3,
  },
  {
    name: 'Dr. Sophia Reynolds',
    departmentId: 3,
    hospitalId: 1,
  },
  {
    name: 'Dr. Ethan Anderson',
    departmentId: 4,
    hospitalId: 3,
  },
  {
    name: 'Dr. Isabella Patel',
    departmentId: 5,
    hospitalId: 3,
  },
  {
    name: 'Dr. Nathan Carter',
    departmentId: 6,
    hospitalId: 3,
  },
  {
    name: 'Dr. Lily Roberts',
    departmentId: 7,
    hospitalId: 3,
  },
  {
    name: 'Dr. Samuel Wilson',
    departmentId: 8,
    hospitalId: 3,
  },
  {
    name: 'Dr. Ava Thompson',
    departmentId: 9,
    hospitalId: 3,
  },
  {
    name: 'Dr. Gabriel Ramirez',
    departmentId: 10,
    hospitalId: 3,
  },
  {
    name: 'Dr. Emily Rodriguez',
    departmentId: 1,
    hospitalId: 4,
  },
  {
    name: 'Dr. Sarah Johnson',
    departmentId: 2,
    hospitalId: 4,
  },
  {
    name: 'Dr. Jennifer Lee',
    departmentId: 3,
    hospitalId: 4,
  },
  {
    name: 'Dr. Jessica Anderson:',
    departmentId: 4,
    hospitalId: 4,
  },
  {
    name: 'Dr. Emily Johnson',
    departmentId: 5,
    hospitalId: 4,
  },
  {
    name: 'Dr. Samantha Lewis',
    departmentId: 6,
    hospitalId: 4,
  },
  {
    name: 'Dr. Sarah Turner',
    departmentId: 7,
    hospitalId: 4,
  },
  {
    name: 'Dr. Laura Davis',
    departmentId: 8,
    hospitalId: 4,
  },
  {
    name: 'Dr. Michelle Anderson',
    departmentId: 9,
    hospitalId: 4,
  },
  {
    name: 'Dr. Jessica Adams',
    departmentId: 10,
    hospitalId: 4,
  },
  {
    name: 'Dr. Michael Patel',
    departmentId: 1,
    hospitalId: 5,
  },
  {
    name: 'Dr. Robert Johnson',
    departmentId: 2,
    hospitalId: 5,
  },
  {
    name: 'Dr. David Smith',
    departmentId: 3,
    hospitalId: 5,
  },
  {
    name: 'Dr. Mark Wilson',
    departmentId: 4,
    hospitalId: 5,
  },
  {
    name: 'Dr. Daniel Ramirez',
    departmentId: 5,
    hospitalId: 5,
  },
  {
    name: 'Dr. Rachel Carter',
    departmentId: 6,
    hospitalId: 5,
  },
  {
    name: 'Dr. John Collins',
    departmentId: 7,
    hospitalId: 5,
  },
  {
    name: 'Dr. Brian Thompson',
    departmentId: 8,
    hospitalId: 5,
  },
  {
    name: 'Dr. Matthew Davis',
    departmentId: 9,
    hospitalId: 5,
  },
  {
    name: 'Dr. Andrew Roberts',
    departmentId: 10,
    hospitalId: 5,
  },
];

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');

    await sequelize.sync({ force: false });
    console.log('Database synced');

    // Check if data exists in the database
    for (const eachData of doctor) {
      const data = await doctors.findOne({
        where: {
          departmentId: eachData.departmentId,
          name: eachData.name,
          hospitalId: eachData.hospitalId,
        },
      });

      if (!data) {
        // Insert data into the database
        const user = await doctors.bulkCreate(doctor);

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
