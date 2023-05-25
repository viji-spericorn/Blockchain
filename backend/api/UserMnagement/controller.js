const user = require('../../models/user');
const login = require('../../models/login');
const { goodResponse, failedResponse } = require('../../helper/response');

// list all
exports.listuser = async (req, res, next) => {
  try {
    const userdata = await user.findAll({
      include: [
        {
          model: login,
          where: { role: 'patient' }, // Filter by role = 'patient'
        },
      ],
    });
    console.log(userdata);
    return res.json(goodResponse({ userdata }, 'Data is fetched successfully'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};
