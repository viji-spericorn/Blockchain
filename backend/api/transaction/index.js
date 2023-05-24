var express = require('express');
var router = express.Router();

const { listtrans, listtransactions } = require('./controller');

router.get('/transactiondetails', listtrans);
router.get('/transaction', listtransactions);

module.exports = router;
