const Joi = require('joi');

exports.consultationValidation = async (req, res, next) => {
  const schema = Joi.object({
    department: Joi.string().required().messages({
      'string.empty': `department is required `,
    }),
    doctor: Joi.string().required().messages({
      'string.empty': `doctor is required `,
    }),
    hospital: Joi.string().required().messages({
      'string.empty': `hospital is required `,
    }),
    date: Joi.string().required().messages({
      'string.empty': `date is required `,
    }),
    time: Joi.string().required().messages({
      'string.empty': `time is required `,
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
