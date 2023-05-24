var express = require('express');
var router = express.Router();

const { addenquiry, viewContact, listContact } = require('./controller');
const { enquiryValidation } = require('./validator');

//api
router.post('/', enquiryValidation, addenquiry);
router.get('/', listContact);

router.get('/:id', viewContact);

module.exports = router;
