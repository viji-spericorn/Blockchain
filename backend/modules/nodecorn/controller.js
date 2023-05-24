const { initiateTask, startTask } = require('.');
const consultation = require('../../models/consultation');
const vaccination = require('../../models/vaccination');

const changeConsultationStatus = initiateTask('*/5 * * * * *', async () => {
  let allConsultations = await consultation.findAll({
    where: {
      status: 'pending',
    },
  });

  const currentTime = new Date();

  allConsultations.forEach(async (consultation) => {
    const endTime = calculateEndTime(consultation.date, consultation.time);
    console.log(currentTime >= endTime);

    if (currentTime >= endTime) {
      await consultation.update(
        { status: 'consulted' },
        { where: { id: consultation.id } }
      );
    }
  });
});

function calculateEndTime(date, startTime) {
  const [hour, minute, meridiem] = startTime
    .trim()
    .split(/:|(?<=\d{2})(?=am|pm)/i);
  let hourValue = parseInt(hour, 10);
  const isPM = meridiem?.toLowerCase() === 'pm';

  if (isPM && hourValue !== 12) {
    hourValue += 12;
  } else if (!isPM && hourValue === 12) {
    hourValue = 0;
  }

  const [year, month, day] = date.split('-');
  const endTime = new Date(year, month - 1, day, hourValue + 1, minute || 0, 0);
  return endTime;
}

const changevaccinationStatus = initiateTask('*/10 * * * * *', async () => {
  console.log('first');
  let allvaccination = await vaccination.findAll({
    where: {
      status: 'notTaken',
    },
  });

  const currentTime = new Date();

  allvaccination.forEach(async (vaccination) => {
    const endTime = calculateEndTime(vaccination.date, vaccination.time);
    console.log(currentTime >= endTime);

    if (currentTime >= endTime) {
      await vaccination.update(
        { status: 'taken' },
        { where: { id: vaccination.id } }
      );
    }
  });
});

function calculateEndTime(date, startTime) {
  const [hour, minute, meridiem] = startTime
    .trim()
    .split(/:|(?<=\d{2})(?=am|pm)/i);
  let hourValue = parseInt(hour, 10);
  const isPM = meridiem?.toLowerCase() === 'pm';

  if (isPM && hourValue !== 12) {
    hourValue += 12;
  } else if (!isPM && hourValue === 12) {
    hourValue = 0;
  }

  const [year, month, day] = date.split('-');
  const endTime = new Date(year, month - 1, day, hourValue + 1, minute || 0, 0);
  return endTime;
}

// task start
if (process.env.CRON && process.env.CRON === 'true') {
  startTask(changeConsultationStatus, 'changeConsultationStatus');
  startTask(changevaccinationStatus, 'changevaccinationstatus');
}
