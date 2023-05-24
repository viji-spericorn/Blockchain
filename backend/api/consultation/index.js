var express = require('express');
const {
  consulationcreate,
  checkconsultation,
  listconsultation,
  cancellation,
  consultbyid,
  createconsultcertificate,
} = require('./controller');
var router = express.Router();
const { consultationValidation } = require('./validator');

router.post('/consultation/add', consulationcreate);
router.post('/consultation/certificate', createconsultcertificate);
router.get('/consultations', listconsultation);
router.get('/gettime', checkconsultation);
router.patch('/cancellation/:id', cancellation);
// router.get('/consultation/:id', consultbyid);

module.exports = router;
