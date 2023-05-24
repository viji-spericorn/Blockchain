const { goodResponse, failedResponse } = require('../../helper/response');
const { AlreadyExistsError } = require('../../helper/expection/existingData');
const contact = require('../../models/contact');
const { sendMail } = require('../../modules/nodemailer/node_mailer');

//submitting enquires
exports.addenquiry = async (req, res, next) => {
  try {
    const isUser = await contact.findOne({
      where: { email: req.body.inputEmail },
    });

    if (isUser) {
      return res.json(AlreadyExistsError('Already Submit an Enquiry'));
    }

    const data = await contact.create({
      name: req.body.inputName,
      email: req.body.inputEmail,
      phoneNumber: req.body.inputPhone,
      message: req.body.validationTextarea,
      status: 'unRead',
    });

    let filters = {
      to: req.body.inputEmail,
      subject: 'your Review Submitted',
      content: `Hi ${req.body.inputName} our representative will contact you shortly`,
    };

    const info = sendMail(filters, res);
    let mailOptions2 = {
      to: 'Admin123@gmail.com',
      subject: 'New Review Submission',
      content: `Hi a Review has been submitted by ${req.body.inputName} with message ${req.body.validationTextarea} and phone number ${req.body.inputPhone} `,
    };
    const info2 = sendMail(mailOptions2, res);
    return res.json(
      goodResponse(
        { data },
        'Thank you for your Review we will contact you shortly'
      )
    );
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

//List
exports.listContact = async (req, res, next) => {
  try {
    const contactlist = await contact.findAll({});
    return res.json(goodResponse({ contactlist }, 'list successfully'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

//view
exports.viewContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Review = await contact.findByPk(id);
    await contact.update({ status: 'Read' }, { where: { id: id } });
    return res.json(goodResponse({ Review }, 'contactus updated successfully'));
    // }
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};
