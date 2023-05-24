const jwt = require('jsonwebtoken');
const users = require('../models/login');
const { jwts } = require('../config');
const { Unauthorized } = require('../helper/expection/unauthorized');
const { failedResponse } = require('../helper/response');

module.exports = async (req, res, next) => {
  try {
    if (
      req.originalUrl.startsWith('/auth') ||
      req.originalUrl.startsWith('/enquiry')
    )
      return next();

    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;

    if (!token) {
      return res.json(Unauthorized('Unauthorized Access'));
    }

    const decoded = await jwt.verify(token, jwts.JWT_SECRET_KEY);
    console.log('decoded', decoded);
    if (!decoded) {
      return res.json(Unauthorized('Invalid Token'));
    }
    if (decoded.exp < Date.now()) {
      return res.json(Unauthorized('Token Expired'));
    }

    const isUserExists = await users.findOne({ where: { id: decoded.id } });

    if (!isUserExists) {
      return res.json(Unauthorized('Access Denied'));
    }
    let matchvalidity = isUserExists.id.concat(isUserExists.email);

    if (matchvalidity != decoded.validity) {
      return res.json(Unauthorized('Access Denied'));
    }

    req.user = decoded;
    return next();
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};
