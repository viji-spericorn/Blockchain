const Joi = require('joi');

exports.signupValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().required().messages({
      'string.empty': 'Name is required',
    }),
    uniqueIdentificationId: Joi.string()
      .trim()
      .regex(/^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/)
      .required()
      .messages({
        'string.pattern.base':
          'Aadhar number must have four digits followed by a space, repeated three times.',
        'string.empty': 'Unique Identification ID is required',
      }),
    phone: Joi.string()
      .trim()
      .regex(/^[0-9]{10}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone number must have 10 digits.',
        'string.empty': 'Phone number is required',
      }),
    email: Joi.string()
      .trim()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Email is invalid',
        'string.empty': 'Email is required',
      }),
    dob: Joi.date()
      .max(new Date().toISOString().split('T')[0])
      .required()
      .messages({
        'string.empty': 'Date of birth is required',
        'string.max': 'Invalid date of birth',
        'any.required': 'Date of birth is required',
      }),

    address: Joi.string().trim().required().messages({
      'string.empty': 'Address is required',
    }),
    pincode: Joi.string()
      .trim()
      .regex(/^[1-9][0-9]{5}$/)
      .required()
      .messages({
        'string.pattern.base': 'PIN code is invalid',
        'string.empty': 'PIN code is required',
      }),
    country: Joi.string().trim().required().messages({
      'string.empty': 'Country is required',
    }),
    state: Joi.string().trim().required().messages({
      'string.empty': 'State is required',
    }),
    password: Joi.string().trim().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.empty': 'Password is required',
    }),
    confirmPassword: Joi.string()
      .trim()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Passwords do not match',
        'string.empty': 'Confirm password is required',
      }),
  });

  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (err) {
    console.log('VALIDATION ERROR', err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};
