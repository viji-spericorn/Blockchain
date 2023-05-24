const Web3 = require('web3');
const {
  initiateTask,
  startTask,
  stopTask,
} = require('../../modules/nodecorn/index');
const Transaction = require('../../models/transaction');
const department = require('../../models/department');
const hospital = require('../../models/hospital');
const doctor = require('../../models/doctor');
const consultation = require('../../models/consultation');
const user = require('../../models/user');
const login = require('../../models/login');
const { failedResponse, goodResponse } = require('../../helper/response');
const { sendMail } = require('../../modules/nodemailer/node_mailer');
const createCertification = require('../../models/consultationCertificate');
const { PDFDocument, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const sequelize = require('../../config/db');
// create trabsaction details
exports.consulationcreate = async (req, res, next) => {
  console.log('req.body', req.body);
  try {
    const currentUserId = await user.findOne({
      where: { loginId: req.user.id },
    });

    const web3 = new Web3(
      'https://polygon-mumbai.g.alchemy.com/v2/M2zPnTYt2zBvMqE_dy-223dklrGU1KLk'
    );

    const response = await web3.eth.getTransactionReceipt(
      req.body.transactionHash
    );

    const transactionData = await Transaction.create({
      transactionHash: response.transactionHash,
      amount: 0.01,
      userId: currentUserId.id,
    });

    const consultationData = await consultation.create({
      ...req.body,
      doctorId: req.body.doctor,
      hospitalId: req.body.hospital,
      departmentId: req.body.department,
      transactionId: transactionData.id,
      userId: currentUserId.id,
    });

    const transactionOnSuccess = initiateTask('*/5 * * * * *', async () => {
      try {
        if (response.status === true) {
          const [onUpdate, [updateData]] = await Transaction.update(
            { status: true },
            { where: { id: transactionData.id }, returning: true }
          );
          stopTask(transactionOnSuccess, 'transactionOnSuccess');
        }
      } catch (err) {
        console.log(err);
      }
    });

    startTask(transactionOnSuccess, 'transactionOnSuccess');
    // res.json({ status: true, message: 'Cron job started' });
    return res.json(
      goodResponse({ consultationData }, 'your consultation added successfully')
    );
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

// filter doctor by time
exports.checkconsultation = async (req, res, next) => {
  try {
    const { doctorId, date } = req.query;

    const times = await consultation.findAll({
      where: { doctorId: req.query.doctorId },
    });
    console.log('times', times);
    return res.json(goodResponse({ times }, 'Time slots'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

//list consultations
exports.listconsultation = async (req, res, next) => {
  const isUser = await login.findOne({ where: { id: req.user.id } });
  try {
    if (isUser.role === 'admin') {
      const consultdata = await consultation.findAll({
        include: [
          {
            model: department,
          },
          {
            model: doctor,
          },
          {
            model: hospital,
          },
          {
            model: user,
          },
          {
            model: Transaction,
          },
        ],
      });

      return res.json(
        goodResponse({ consultdata }, 'consultation listed Successfully')
      );
    } else {
      const isUser = await user.findOne({ where: { loginId: req.user.id } });

      const consultdata = await consultation.findAll({
        where: { userId: isUser.id },
        include: [
          {
            model: department,
          },
          {
            model: doctor,
          },
          {
            model: hospital,
          },
          {
            model: user,
            include: [{ model: login }],
          },
          {
            model: Transaction,
          },
        ],
      });

      return res.json(
        goodResponse({ consultdata }, 'consultation listed Successfully')
      );
    }
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

//cancellation

exports.cancellation = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log('req.params.id', req.params.id);
    const datas = await consultation.findByPk(id, {
      include: [
        {
          model: user,
        },
        {
          model: department,
        },
        {
          model: doctor,
        },
        {
          model: hospital,
        },
        {
          model: user,
        },
        {
          model: Transaction,
        },
      ],
    });
    console.log('data', datas);

    const updateconsult = await consultation.update(
      {
        status: 'cancel',
      },
      { where: { id: id } }
    );

    //mail confirmation

    let filters = {
      to: datas.user.login.email,
      cc: 'viji@spericorn.com',
      subject: 'Cancellation of appoinment',
      content: `Cancelled Successfully.You can now get ur registration fee with in 10 working Days`,
    };

    let send = await sendMail(filters, res);
    return res.json(goodResponse({ updateconsult }, 'Cancelled successfully'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

// //get details by id
// exports.consultbyid = async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const data = await consultation.findOne({
//       where: { userId: id },
//       include: [
//         {
//           model: user,
//           include: [
//             {
//               model: login,
//             },
//           ],
//         },
//         {
//           model: department,
//         },
//         {
//           model: doctor,
//         },
//         {
//           model: hospital,
//         },

//         {
//           model: Transaction,
//         },
//       ],
//     });

//     console.log('data', data);

//     return res.json(goodResponse({ data }, 'Data fecthed Successfully'));
//   } catch (error) {
//     return res.json(failedResponse(error.message));
//   }
// };

//create consultation certificate
exports.createconsultcertificate = async (req, res, next) => {
  console.log('req.body', req.body);

  const {
    certificateNumber,
    patientName,
    patientUUID,
    patientRegId,
    doctorName,
    consultationTime,
    departmentName,
    hospitalName,
    issuerName,
    issuerId,
    issuedDateTime,
    transactionHash,
  } = req.body;

  // const web3 = new Web3(
  //   'https://polygon-mumbai.g.alchemy.com/v2/M2zPnTYt2zBvMqE_dy-223dklrGU1KLk'
  // );

  // const response = await web3.eth.getTransactionReceipt(
  //   req.body.transactionHash
  // );

  const userid = await user.findOne({ where: { aadharNumber: patientUUID } });

  const transactionData = await Transaction.create({
    transactionHash,
    amount: 0,
    appointmentType: 'consultationCertificate',
    userId: userid.id,
  });

  const consultationCertificate = await createCertification.create({
    certificateNumber,
    patientName,
    patientUUID,
    patientRegId,
    doctorName,
    consultationTime,
    departmentName,
    hospitalName,
    issuerName,
    issuerId,
    issuedDateTime,
    transactionId: transactionData.id,
  });
  console.log('consultationCertificate', consultationCertificate);
  // const transactionOnSuccess = initiateTask('*/5 * * * * *', async () => {
  //   if (response.status === true) {
  //     const datas = await Transaction.update(
  //       { status: true },
  //       { where: { id: transactionData.id }, returning: true }
  //     );
  //     stopTask(transactionOnSuccess, 'transactionOnSuccess');
  //   }
  //   startTask(transactionOnSuccess, 'transactionOnSuccess');
  // });

  return res.json(
    goodResponse(
      { consultationCertificate, transactionData },
      'Issued certificate successfully.'
    )
  );
};
// console.log('certificates', {
//   certificateNumber,
//   patientName,
//   patientUUID,
//   patientRegId,
//   doctorName,
//   consultationTime,
//   departmentName,
//   hospitalName,
//   issuerName,
//   issuerId,
//   issuedDateTime,
//   transactionId: transactionData.id,
// });

//   { transaction }
// );
// console.log('consultationCertificate', consultationCertificate);
// await generatePDF(req.body);

//   } catch (err) {
//     console.log(err);
//   }
// });

async function generatePDF(data) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new page
  const page = pdfDoc.addPage();

  // Set the font and font size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(font);
  page.setFontSize(20);

  // Set the content on the page
  page.drawText('Hello, World!', {
    x: 50,
    y: 50,
  });

  // Save the PDF to a file
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('output.pdf', pdfBytes);
}
