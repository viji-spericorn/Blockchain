const { failedResponse, goodResponse } = require('../../helper/response');
const disease = require('../../models/diseaseNames');

//list all diseasesNames
exports.listdisease = async (req, res, next) => {
  try {
    const diseaseNames = await disease.findAll({});
    return res.json(
      goodResponse({ diseaseNames }, 'Get diseaseNames Successfully')
    );
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};
