import initiateContractTransaction from './initiateContractTransaction';

import { useDispatch, useSelector } from 'react-redux';
// import { REciptDataSent } from './actions';

// import { addSwapValues } from '../../components/common/redux/Approval';
import CONSULTATION_ABI from './WMATIC_ABI';
let networks;
const wrappedTokenDeposit = async ({
  // walletselect,
  address,
  // accountNumber,
  web3,
  certificationValues,
  // amount,
  // tokenDecimals,
  // netVer,
  dispatch,
}) => {
  const tokenAddress = '0xb85987bd100b2B211aD81A785E6a76592Fc29b60';

  // if (networks === 80001) {
  console.log('certificationValues', certificationValues);
  const smartContract = await new web3.eth.Contract(
    CONSULTATION_ABI,
    tokenAddress
  );

  function generateRandomNumber() {
    const min = 1000000000; // Minimum 10-digit number (inclusive)
    const max = 9999999999; // Maximum 10-digit number (inclusive)

    const generatedNumbers = new Set();
    let randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (generatedNumbers.has(randomNumber));

    generatedNumbers.add(randomNumber);

    return randomNumber.toString(); // Convert the number to a string
  }

  let random = generateRandomNumber();

  console.log('randomNumber', random);
  const value = certificationValues.hospitalName;
  const slicedValue = value.split(' ')[0];
  console.log(slicedValue);
  // Unix convert

  // Datas Input to Blockchain
  const certificateNumber = random;

  const patientName = web3.utils.padRight(
    web3.utils.fromAscii(certificationValues.patientName),
    64
  );
  console.log(
    'certificationValues.patientUUID',
    certificationValues.patientUUID
  );
  const patientUUID = web3.utils.padRight(
    web3.utils.fromAscii(certificationValues.patientUUID),
    64
  );
  const patientRegId = certificationValues.patientRegId;
  const doctorName = web3.utils.padRight(
    web3.utils.fromAscii(certificationValues.doctorName),
    64
  );
  const consultationTime = certificationValues.consultationTime;
  const departmentName = web3.utils.padRight(
    web3.utils.fromAscii(certificationValues.departmentName),
    64
  );
  const hospitalName = web3.utils.padRight(
    web3.utils.fromAscii(slicedValue),
    64
  );
  const issuerName = web3.utils.padRight(web3.utils.fromAscii(slicedValue), 64);
  const issuerId = web3.utils.padRight(
    web3.utils.fromAscii(certificationValues.issuerId),
    64
  );
  const issuedDateTime = certificationValues.issuedDateTime;

  console.log('first', {
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
  });

  const createCertificationFunction = smartContract.methods.createCertification(
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
    issuedDateTime
  );

  

  const result = await initiateContractTransaction({
    web3,
    contractFunction: createCertificationFunction,
    contractAddress: tokenAddress,
    address,
    tokenDecimals: 18,
    amountValue: 0,
  });

  console.log('result', result);

  const subscription = await smartContract.events.CertificationEvent({
    fromBlock: result.blockNumber,
  });

  const decodedCertificateData = () => {
    return new Promise((resolve) => {
      subscription.on('data', (event) => {
        const eventReturn = event.returnValues;
        console.log('evenrReturnBefore', eventReturn);
        const startTimestamp = event.returnValues.issuedDateTime; // Example start timestamp
        const endTimestamp = event.returnValues.consultationTime; // Example end timestamp

        const startDate = new Date(startTimestamp * 1000);
        const endDate = new Date(endTimestamp * 1000);

        const startHours = startDate.getHours();
        const endHours = endDate.getHours();

        const startAMPM = startHours >= 12 ? 'PM' : 'AM';
        const endAMPM = endHours >= 12 ? 'PM' : 'AM';

        console.log(startAMPM);
        console.log(endAMPM);

        const returnedCertificates = {
          certificateNumber: eventReturn.certificateNumber,
          patientName: web3.utils.hexToUtf8(eventReturn.patientName),
          patientUUID: web3.utils.hexToUtf8(eventReturn.patientUUID),
          patientRegId: eventReturn.patientRegId,
          doctorName: web3.utils.hexToUtf8(eventReturn.doctorName),
          consultationTime: new Date(),
          departmentName: web3.utils.hexToUtf8(eventReturn.departmentName),
          hospitalName:
            web3.utils.hexToUtf8(eventReturn.hospitalName) + 'Hospitals',
          issuerName: web3.utils.hexToUtf8(eventReturn.issuerName),
          issuerId: web3.utils.hexToUtf8(eventReturn.issuerId),
          issuedDateTime: new Date(),
        };
        resolve(returnedCertificates);
      });
    });
  };

  const decodedCertificateDataReturn = await decodedCertificateData();

  console.log('decodedCertificateDataReturn', decodedCertificateDataReturn);

  return {
    ...decodedCertificateDataReturn,
    transactionHash: result.transactionHash,
  };
};

export default wrappedTokenDeposit;
