var express = require('express');
const {
  vaccinationcreate,
  listvaccination,
  checkdate,
  cancellation,
  createvaccinecertificate,
} = require('./controller');
var router = express.Router();

router.post('/vaccinationcreate', vaccinationcreate);
router.post('/vaccine/certificate', createvaccinecertificate);
router.get('/vaccinations', listvaccination);

router.get('/getdate', checkdate);
router.patch('/vaccinationcancel/:id', cancellation);

module.exports = router;
