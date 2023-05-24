import initiateContractTransaction from './initiateContractTransaction';
import VACCINATION_ABI from './VACCINE_ABI';
import { v4 as uuidv4 } from 'uuid';

const wrappedTokenWithdraw = async ({
  address,
  web3,
  netVer,
  certificationValues,
}) => {
  try {
    const tokenAddress = '0x535Ac607e72146218Bc5e7d3b71a37944a77025C';

    console.log('certificationValues', certificationValues);

    const smartContract = await new web3.eth.Contract(
      VACCINATION_ABI,
      tokenAddress
    );

    console.log('smartContract', smartContract);

    const patientName = web3.utils.padRight(
      web3.utils.fromAscii(certificationValues.patientName),
      64
    );
    const certificateNumber = uuidv4();
    const patientUUID = web3.utils.padRight(
      web3.utils.fromAscii(certificationValues.patientUUID),
      64
    );
    const patientRegId = certificationValues.patientRegId;
    const vaccineName = web3.utils.padRight(
      web3.utils.fromAscii(certificationValues.vaccineName),
      64
    );
    const vaccineTakenDatetime = certificationValues.vaccineTakenDatetime;
    const disease = web3.utils.padRight(
      web3.utils.fromAscii(certificationValues.disease),
      64
    );
    const antigen = web3.utils.padRight(
      web3.utils.fromAscii(certificationValues.antigen),
      64
    );
    const issuerName = web3.utils.padRight(
      web3.utils.fromAscii(certificationValues.issuerName),
      64
    );
    const issuerId = web3.utils.padRight(
      web3.utils.fromAscii(certificationValues.issuerId),
      64
    );
    const issuedDateTime = certificationValues.issuedDateTime;

    console.log('dtttttt', {
      certificateNumber,
      patientName,
      patientUUID,
      patientRegId,
      antigen,
      disease,
      vaccineName,
      vaccineTakenDatetime,
      issuerName,
      issuerId,
      issuedDateTime,
    });
    const createCertificationFunction =
      await smartContract.methods.createCertification(
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
        issuedDateTime
      );

    const result = await initiateContractTransaction({
      contractFunction: createCertificationFunction,
      address,
      web3,
    });

    const subscription = await smartContract.events.CertificationEvent({
      fromBlock: result.blockNumber,
    });

    const decodedDataFunction = () =>
      new Promise((resolve) => {
        subscription.on('data', (event) => {
          const decodedData = {
            vaccineName: web3.utils.hexToUtf8(event.returnValues.vaccineName),
            patientName: web3.utils.hexToUtf8(event.returnValues.patientName),
            certificateNumber: event.returnValues.certificateNumber,
            patientUUID: web3.utils.hexToUtf8(event.returnValues.patientUUID),
            patientRegId: event.returnValues.patientRegId,
            vaccineTakenDatetime: event.returnValues.vaccineTakenDatetime,
            disease: web3.utils.hexToUtf8(event.returnValues.disease),
            antigen: web3.utils.hexToUtf8(event.returnValues.antigen),
            issuerName: web3.utils.hexToUtf8(event.returnValues.issuerName),
            issuerId: web3.utils.hexToUtf8(event.returnValues.issuerId),
            issuedDateTime: event.returnValues.issuedDateTime,
          };

          resolve(decodedData);
        });
      });

    const decodedData = await decodedDataFunction();

    if (result) {
      return { ...decodedData, transactionHash: result.transactionHash };
    } else {
      throw new Error('No result.');
    }
  } catch (err) {
    console.log(err);
    throw new Error('Something went wrong');
  }
};

export default wrappedTokenWithdraw;
