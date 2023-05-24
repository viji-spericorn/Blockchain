const { goodResponse, failedResponse } = require('../../helper/response');
const { AlreadyExistsError } = require('../../helper/expection/existingData');
const login = require('../../models/login');
const user = require('../../models/user');
const { jwts } = require('../../config');
const jwt = require('jsonwebtoken');
const healthInformation = require('../../models/healthInformation');
const disease = require('../../models/disease');
const { NotFound } = require('../../helper/expection/notFound');

// getting the profile details
exports.getProfiledata = async (req, res, next) => {
  try {
    //IDENTIFY THE LOGIN DETAILS
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    const decoded = jwt.verify(token, jwts.JWT_SECRET_KEY);
    const decodedemail = decoded.email;
    const loginData = await login.findAll({ where: { email: decodedemail } });
    const profiledata = await user.findOne({
      where: { loginId: loginData[0].id },
      include: [
        {
          model: login,
        },
      ],
    });

    return res.json(
      goodResponse({ profiledata }, 'Get profile details successfully')
    );
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

//ADD HELATHINFORMATION
exports.healthinfo = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    const decoded = jwt.verify(token, jwts.JWT_SECRET_KEY);
    const decodedemail = decoded.email;
    const loginData = await login.findAll({ where: { email: decodedemail } });
    const profiledata = await user.findOne({
      where: { loginId: loginData[0].id },
      include: [
        {
          model: login,
        },
      ],
    });
    const userId = profiledata.id;
    const healthdetails = await healthInformation.create({
      ...req.body,
      userId: userId,
      blood: req.body.bloodGroup,
    });

    return res.json(
      goodResponse({ healthdetails }, 'save health details successfully')
    );
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

// list health info

exports.listhealthinfo = async (req, res, next) => {
  try {
    const isUser = await user.findOne({ where: { loginId: req.user.id } });
    const health = await healthInformation.findOne({
      where: { userId: isUser.id },
    });

    return res.json(goodResponse({ health }, 'Healthinfo listed Successfully'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

//ADD DISEASEINFORMATION
exports.diseaseinfo = async (req, res, next) => {
  try {
    const profiledata = await user.findOne({
      where: { loginId: req.user.id },
      include: [
        {
          model: login,
        },
      ],
    });

    const userId = profiledata.id;
    const healthdetails = await disease.create({
      ...req.body,
      userId: userId,
    });

    return res.json(
      goodResponse({ healthdetails }, 'save health details successfully')
    );
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

// list disease info

exports.listdiseaseinfo = async (req, res, next) => {
  try {
    const isUser = await user.findOne({ where: { loginId: req.user.id } });
    const diseases = await disease.findAll({
      where: { userId: isUser.id },
    });

    return res.json(
      goodResponse({ diseases }, 'diseaseinfo listed Successfully')
    );
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

// //delete
exports.deletedisease = async (req, res) => {
  const id = req.params.id;
  try {
    const datas = await disease.findByPk(id);

    await datas.destroy();
    return res.json(goodResponse({ datas }, 'Deleted Successfully'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

//update health information

exports.updateHealth = async (req, res, next) => {
  console.log('req.body', req.body);
  try {
    const datas = await healthInformation.findOne({
      where: { id: req.body.id },
    });
    if (!datas) {
      return res.json(
        NotFound('The person with the given ID was not found.', 404)
      );
    }
    const updatehealth = await healthInformation.update(
      {
        blood: req.body.bloodGroup,
        gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight,
      },
      { where: { id: req.body.id } }
    );

    return res.json(goodResponse({ updatehealth }, 'Updated Successfully'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

// update personal details

exports.updatebasicInfo = async (req, res, next) => {
  console.log('req.body', req.body);
  try {
    const datas = await user.findOne({
      where: { id: req.body.id },
    });
    if (!datas) {
      return res.json(
        NotFound('The person with the given ID was not found.', 404)
      );
    }
    const updatebasic = await user.update(
      {
        ...req.body,
        phoneNumber: req.body.phone,
        aadharNumber: req.body.uniqueIdentificationId,
        pinCode: req.body.pincode,
      },
      { where: { id: req.body.id } }
    );

    return res.json(goodResponse({ updatebasic }, 'Updated Successfully'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};
