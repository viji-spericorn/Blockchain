const nodemailer = require('nodemailer');
const { mail } = require('../../config');

exports.sendMail = async (filter, res) => {
  const { to, content, subject, cc, bcc } = filter;

  try {
    const transporter = nodemailer.createTransport({
      service: mail.service,
      auth: {
        user: mail.email,
        pass: mail.pass,
      },
    });

    let send = await transporter.sendMail({
      from: mail.email,
      to: to,
      cc: cc,
      bcc: bcc,
      subject: subject,
      text: content,
    });
    return true;
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
