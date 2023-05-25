var express = require('express');
var router = express.Router();

/* GET all page. */
router.use('/auth', require('../api/AuthManagement/index'));
router.use('/', require('../api/PatientManagement/index'));
router.use('/', require('../api/disease/index'));
router.use('/enquiry', require('../api/ContactUsManagement/index'));
router.use('/department', require('../api/department_management/index'));
router.use('/hospital', require('../api/hospital_management/index'));
router.use('/doctor', require('../api/doctor_mangement/index'));
router.use('/', require('../api/consultation/index'));
router.use('/', require('../api/vaccine/index'));
router.use('/', require('../api/VaccinationManagement/index'));
router.use('/', require('../api/transaction/index'));
router.use('/', require('../api/UserMnagement/index'));

module.exports = router;
