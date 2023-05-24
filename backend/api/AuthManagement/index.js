var express = require('express');
const { signup, login } = require('./controller');
var router = express.Router();

const { signupValidation } = require('./validator');

router.post('/signup', signupValidation, signup);
router.post('/', login);

module.exports = router;
