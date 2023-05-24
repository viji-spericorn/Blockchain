var express = require('express');
const {
  getProfiledata,
  healthinfo,
  listhealthinfo,
  diseaseinfo,
  listdiseaseinfo,
  deletedisease,
  updateHealth,
  updatebasicInfo,
} = require('./controller');
var router = express.Router();

const {
  healthinfoValidation,
  diseaseinfoValidation,
  updatehealthinfoValidation,
  basicinfoValidation,
} = require('./validator');

// basic details
router.get('/patient/profile', getProfiledata);
router.patch('/profileupdate/:id', basicinfoValidation, updatebasicInfo);
router.get('/profiles', getProfiledata);

// health info api
router.post('/patient/healthdetails', healthinfoValidation, healthinfo);
router.get('/patient/healthdetails', listhealthinfo);
router.patch('/healthinfoupdate/:id', updatehealthinfoValidation, updateHealth);

//disease info api

router.post('/patient/diseasedetails', diseaseinfoValidation, diseaseinfo);
router.get('/patient/diseasedetails', listdiseaseinfo);
router.delete('/patient/:id', deletedisease);
module.exports = router;
