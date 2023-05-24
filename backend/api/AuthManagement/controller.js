//setting patient signup

const { AlreadyExistsError } = require('../../helper/expection/existingData');
const { failedResponse, goodResponse } = require('../../helper/response');
const login = require('../../models/login');
const user = require('../../models/user');
const { sendMail } = require('../../modules/nodemailer/node_mailer');

exports.signup = async (req, res, next) => {
  try {
    let isExist = await login.findOne({ where: { email: req.body.email } });
    let uuidata = await user.findOne({
      where: { aadharNumber: req.body.uniqueIdentificationId },
    });
    if (isExist) {
      return res.json(AlreadyExistsError('User with this email already exist'));
    } else if (uuidata) {
      return res.json(
        AlreadyExistsError('Aadhar with this number already exist please check')
      );
    } else {
      let { datas } = req.body;

      const salt = await login.generateSalt();
      password = await login.hashPassword(req.body.password, salt);
      req.body.salt = salt;

      // login data
      let loginData = await login.create({
        email: req.body.email,
        password: password,
        salt: req.body.salt,
      });

      //signup data
      const signups = await user.create({
        ...req.body,
        phoneNumber: req.body.phone,
        aadharNumber: req.body.uniqueIdentificationId,
        pinCode: req.body.pincode,
        loginId: loginData.id,
      });

      //mail confirmation

      let filters = {
        to: req.body.email,
        cc: 'viji@spericorn.com',
        subject: 'Signup Successfully',
        content: `Welcome you can login with username as ${req.body.email} and password as ${req.body.password}`,
      };

      let send = await sendMail(filters, res);
      if (send) {
        return res.json(goodResponse({ signups }, 'User Signup Successfully'));
      }
    }
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

//setting login for all

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let users = await login.findOne({ where: { email: req.body.email } });
    // no user
    if (!users) {
      return res.json(failedResponse('Invalid username or password'));
    }

    // invalid password
    if (!(await login.verifyPassword(password, users.password, users.salt)))
      return res.json(failedResponse('Invalid username or password'));

    const accessToken = login.generateAuthToken(users);
    const refreshToken = login.generateAuthToken(users);
    let role = users.role;
    return res.json(
      goodResponse(
        {
          accessToken,
          role: role,
        },
        'Login Successfully'
      )
    );
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};
