const Joi = require('joi');

exports.healthinfoValidation = async (req, res, next) => {
  const schema = Joi.object({
    bloodGroup: Joi.string().trim().required().messages({
      'string.empty': 'Blood group is required',
    }),
    height: Joi.number().positive().required().messages({
      'number.empty': 'Height is required',
      'number.positive': 'Height must be a positive number',
    }),
    weight: Joi.number().positive().required().messages({
      'number.empty': 'Weight is required',
      'number.positive': 'Weight must be a positive number',
    }),
    gender: Joi.string().valid('male', 'female', 'other').required().messages({
      'string.empty': 'Gender is required',
      'any.only': 'Invalid gender',
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

exports.diseaseinfoValidation = async (req, res, next) => {
  const schema = Joi.object({
    diseaseName: Joi.string().trim().required().messages({
      'string.empty': 'Disease Name is required',
    }),

    startDate: Joi.date()
      .max(new Date().toISOString().split('T')[0])
      .required() // Start Date should be today or a past date
      .messages({
        'date.empty': 'Start Date is required',
        'date.base': 'Start Date must be a valid date',
        'date.max': 'Start Date must be today or a past date',
      }),
    remarks: Joi.string().trim().allow('').optional(),
  });

  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log('VALIDATION ERROR', error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// update health

exports.updatehealthinfoValidation = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().trim().required().messages({
      'string.empty': 'ID is required',
    }),
    bloodGroup: Joi.string().trim().required().messages({
      'string.empty': 'Blood group is required',
    }),
    height: Joi.number().positive().required().messages({
      'number.empty': 'Height is required',
      'number.positive': 'Height must be a positive number',
    }),
    weight: Joi.number().positive().required().messages({
      'number.empty': 'Weight is required',
      'number.positive': 'Weight must be a positive number',
    }),
    gender: Joi.string().valid('male', 'female', 'other').required().messages({
      'string.empty': 'Gender is required',
      'any.only': 'Invalid gender',
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

// update personal details
exports.basicinfoValidation = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().trim().required().messages({
      'string.empty': 'ID is required',
    }),
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
