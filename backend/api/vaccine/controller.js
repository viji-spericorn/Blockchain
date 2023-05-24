const vaccine = require('../../models/vaccine');
const { goodResponse, failedResponse } = require('../../helper/response');

//List
exports.listvaccine = async (req, res, next) => {
  try {
    console.log(req.query);
    const vaccineList = await vaccine.findAll({});
    return res.json(goodResponse({ vaccineList }, 'Data is'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};
