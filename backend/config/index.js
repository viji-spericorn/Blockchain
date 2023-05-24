require('dotenv').config();
const env = process.env.NODE_ENV || 'local';
const configurations = require('./config.json');

module.exports = configurations[env];
