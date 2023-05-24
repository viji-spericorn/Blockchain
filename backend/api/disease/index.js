var express = require('express');

var router = express.Router();

const { listdisease } = require('./controller');

router.get('/alldiseases', listdisease);

module.exports = router;
