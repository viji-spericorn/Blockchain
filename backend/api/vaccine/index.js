var express = require('express');
var router = express.Router();

const { listvaccine } = require('./controller');

router.get('/vaccines', listvaccine);

module.exports = router;
