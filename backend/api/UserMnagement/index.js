var express = require('express');
const { listuser } = require('./controller');
var router = express.Router();

router.get('/patientdetails', listuser);

module.exports = router;
