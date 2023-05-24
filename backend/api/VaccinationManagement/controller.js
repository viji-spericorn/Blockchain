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
const user = require('../../models/user');
const login = require('../../models/login');
const vaccineCertificate = require('../../models/vaccineCertificate');
const { failedResponse, goodResponse } = require('../../helper/response');
const { sendMail } = require('../../modules/nodemailer/node_mailer');
const vaccination = require('../../models/vaccination');
const vaccine = require('../../models/vaccine');
const { PDFDocument, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const sequelize = require('../../config/db');

// create vaccination details
exports.vaccinationcreate = async (req, res, next) => {
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
      appointmentType: 'vaccination',
      userId: currentUserId.id,
    });

    const vaccinationData = await vaccination.create({
      ...req.body,
      vaccineId: req.body.vaccine,
      transactionId: transactionData.id,
      userId: currentUserId.id,
      hospitalId: req.body.hospital,
    });

    const transactionOnSuccess = initiateTask('*/5 * * * * ', async () => {
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
    return res.json(
      goodResponse({ vaccinationData }, 'your vaccination added successfully')
    );
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

// filter by time
exports.checkdate = async (req, res, next) => {
  try {
    const { doctorId, date } = req.query;

    const times = await vaccination.findAll({
      where: { date: req.query.date },
    });
    console.log('times', times);
    return res.json(goodResponse({ times }, 'Time slots'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

//list consultations
exports.listvaccination = async (req, res, next) => {
  const isUser = await login.findOne({ where: { id: req.user.id } });
  try {
    if (isUser.role === 'admin') {
      const vaccinedata = await vaccination.findAll({
        include: [
          {
            model: vaccine,
          },
          {
            model: hospital,
          },
          {
            model: user,
            include: [
              {
                model: login,
              },
            ],
          },
          {
            model: Transaction,
          },
        ],
      });

      return res.json(
        goodResponse({ vaccinedata }, 'vaccine listed Successfully')
      );
    } else {
      const isUser = await user.findOne({ where: { loginId: req.user.id } });

      const vaccinedata = await vaccination.findAll({
        where: { userId: isUser.id },
        include: [
          {
            model: user,
            include: [
              {
                model: login,
              },
            ],
          },
          {
            model: vaccine,
          },
          {
            model: Transaction,
          },
          {
            model: hospital,
          },
        ],
      });

      return res.json(
        goodResponse({ vaccinedata }, 'vaccine listed Successfully')
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
    const datas = await vaccination.findByPk(id, {
      include: [
        {
          model: user,
        },
        {
          model: vaccine,
        },
        {
          model: Transaction,
        },
        {
          model: hospital,
        },
      ],
    });
    console.log('data', datas);

    const updatevaccine = await vaccination.update(
      {
        status: 'cancel',
      },
      { where: { id: id } }
    );

    //mail confirmation

    let filters = {
      to: datas.user.login.email,
      cc: 'viji@spericorn.com',
      subject: 'Cancellation of vaccination',
      content: `Cancelled Successfully.You can now get ur registration fee with in 10 working Days`,
    };

    let send = await sendMail(filters, res);
    return res.json(goodResponse({ updatevaccine }, 'Cancelled successfully'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

exports.createvaccinecertificate = async (req, res, next) => {
  console.log('req.body', req.body);
  const userid = await user.findOne({
    where: { aadharNumber: req.body.patientUUID },
  });
  try {
    const {
      certificateNumber,
      patientName,
      patientUUID,
      patientRegId,
      vaccineName,
      vaccineTakenDatetime,
      disease,
      antigen,
      issuerName,
      issuerId,
      issuedDateTime,
      transactionHash,
    } = req.body;

    const web3 = new Web3(
      'https://polygon-mumbai.g.alchemy.com/v2/M2zPnTYt2zBvMqE_dy-223dklrGU1KLk'
    );
    const response = await web3.eth.getTransactionReceipt(transactionHash);
    await sequelize
      .transaction(async (transaction) => {
        const transactionData = await Transaction.create({
          transactionHash,
          amount: 0,
          appointmentType: 'vaccinationCertificate',
          UserId: userid.id,
        });
        const vaccinationCertificate = await vaccineCertificate.create(
          {
            certificateNumber,
            patientName,
            patientUUID,
            patientRegId,
            vaccineName,
            vaccineTakenDatetime,
            disease,
            antigen,
            issuerName,
            issuerId,
            issuedDateTime,
            transactionId: transactionData.id,
          },
          { transaction }
        );
        await generatePDF(req.body);

        const transactionOnSuccess = initiateTask('*/5 * * * * *', async () => {
          try {
            if (response.status === true) {
              const trans = await Transaction.update(
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
        return Promise.all([vaccinationCertificate, transactionData]).then(
          ([vaccinationCertificate, transactionData]) =>
            res.json(
              goodResponse(
                { vaccinationCertificate, transactionData },
                'Issued certificate successfully.'
              )
            )
        );
      })
      .catch((error) => res.json(failedResponse(error.message)));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

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
