const transaction = require('../../models/transaction');
const { goodResponse, failedResponse } = require('../../helper/response');
const user = require('../../models/user');

//List
exports.listtrans = async (req, res, next) => {
  try {
    console.log(req.query);

    const isUser = await user.findOne({ where: { loginId: req.user.id } });
    const trans = await transaction.findAll({ where: { userId: isUser.id } });
    return res.json(goodResponse({ trans }, 'Data is'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

// list all
exports.listtransactions = async (req, res, next) => {
  try {
    const trans = await transaction.findAll({ include: [{ model: user }] });
    return res.json(goodResponse({ trans }, 'Data is fetched successfully'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};
