const Joi = require('joi');

//validation for enquiry
exports.enquiryValidation = async (req, res, next) => {
  const contactSchema = Joi.object({
    inputName: Joi.string()
      .min(3)
      .max(30)
      .required()
      .pattern(/^[a-zA-Z]+$/)
      .messages({
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must not exceed 30 characters',
        'string.pattern.base': 'Name should contain only alphabetic characters',
        'any.required': 'Name is required',
      }),
    inputPhone: Joi.string()
      .pattern(/^\d{10}$/)
      .required()
      .messages({
        'string.pattern.base':
          'Phone number must be 10 digits without spaces or special characters',
        'any.required': 'Phone number is required',
      }),
    inputEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Invalid email address',
        'any.required': 'Email is required',
      }),
    validationTextarea: Joi.string().min(5).max(200).required().messages({
      'string.min': 'Message must be at least 5 characters long',
      'string.max': 'Message cannot exceed 200 characters',
      'any.required': 'Message is required',
    }),
  });

  try {
    req.body = await contactSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
