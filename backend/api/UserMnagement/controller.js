const user = require('../../models/user');
const login = require('../../models/login');

// list all
exports.listuser = async (req, res, next) => {
  try {
    const userdata = await user.findAll({ include: [{ model: login }] });
    return res.json(goodResponse({ userdata }, 'Data is fetched successfully'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};
