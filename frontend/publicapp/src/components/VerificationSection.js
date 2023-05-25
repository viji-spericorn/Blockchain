import React, { useState } from 'react';
import Web3 from 'web3';
import consultationCertificateVerificationFunction from '../blockchain/certificateVerificationFunction';
import certificateVerificationFunction from '../blockchain/vaccinationCertificateVerify';
import Navigation from './Navigation';
import moment from 'moment';
import '../css/certificate.css';

function SearchForm1({ setconsult }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    console.log(searchQuery);
    const data = await consultationCertificateVerificationFunction({
      web3,
      certificateNumber: searchQuery,
    });

    const consultcerti = decodeconsult(data);
    setconsult(consultcerti);
    console.log(consultcerti);
    console.log('Form 1 submitted with search query:', data);
  };

  return (
    <form onSubmit={handleSubmit} className="m-2">
      <label htmlFor="search1">
        <strong>Consultation Certificate</strong>
      </label>
      <input
        type="text"
        id="search1"
        className="form-control"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Enter your consultation Certificate"
        required
      />
      <button type="submit" className="btn btn-primary m-1">
        Search
      </button>
    </form>
  );
}

const decodeconsult = (data) => {
  const returnedCertificates = {
    certificateNumber: data.certificateNumber,
    patientName: Web3.utils.hexToUtf8(data.patientName),
    patientUUID: Web3.utils.hexToUtf8(data.patientUUID),
    patientRegId: data.patientRegId,
    doctorName: Web3.utils.hexToUtf8(data.doctorName),
    consultationTime: data.consultationTime,
    departmentName: Web3.utils.hexToUtf8(data.departmentName),
    hospitalName: Web3.utils.hexToUtf8(data.hospitalName),
    issuerName: Web3.utils.hexToUtf8(data.issuerName),
    issuerId: Web3.utils.hexToUtf8(data.issuerId),
    issuedDateTime: data.issuedDateTime,
  };

  console.log('returnedCertificates', returnedCertificates);
  return returnedCertificates;
};

function SearchForm2({ setcerti }) {
  const [searchQuery1, setSearchQuery1] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    console.log(searchQuery1);
    const datas = await certificateVerificationFunction({
      web3,
      certificateNumber: searchQuery1,
    });
    const certificate = vaccinecertificate(datas);
    setcerti(certificate);
  };

  // decoding vaccine

  const vaccinecertificate = (data) => {
    const decodedData = {
      patientName: Web3.utils.hexToUtf8(data.patientName),
      certificateNumber: data.certificateNumber,
      patientUUID: Web3.utils.hexToUtf8(data.patientUUID),
      patientRegId: data.patientRegId,
      vaccineName: Web3.utils.hexToUtf8(data.vaccineName),
      vaccineTakenDatetime: data.vaccineTakenDatetime,
      disease: Web3.utils.hexToUtf8(data.disease),
      antigen: Web3.utils.hexToUtf8(data.antigen),
      issuerName: Web3.utils.hexToUtf8(data.issuerName),
      issuerId: Web3.utils.hexToUtf8(data.issuerId),
      issuedDateTime: data.issuedDateTime,
    };
    console.log('decodedData', decodedData);
    return decodedData;
  };

  return (
    <form onSubmit={handleSubmit} className="m-2">
      <label htmlFor="search2">
        <strong>Vaccination Certificate</strong>
      </label>
      <input
        type="text"
        id="search2"
        className="form-control"
        value={searchQuery1}
        onChange={(event) => setSearchQuery1(event.target.value)}
        placeholder="Verify vaccination ceritificate"
        required
      />
      <button type="submit" className="btn btn-primary m-1">
        Search
      </button>
    </form>
  );
}

function Verify() {
  const [certi, setcerti] = useState({});
  const [consult, setceconsult] = useState({});
  const [close1, setclose1] = useState(false);
  const [close, setclose] = useState(false);

  return (
    <div>
      <Navigation />
      <div className="mt-5">
        <div className="container justify-content-center">
          <h1>Verify your Certificates</h1>

          <div>
            <SearchForm1 setceconsult={setceconsult} setclose={setclose} />
            <div>
              <button
                className="btn btn-primary m-2"
                onClick={() => setclose1(true)}
              >
                Close
              </button>
            </div>
          </div>
          <div>
            {close1 ? (
              ''
            ) : (
              <div>
                <div className="outer-border">
                  <div className="inner-dotted-border">
                    <span className="certification">
                      Certificate of Consultation
                    </span>
                    <br></br>
                    <span className="certify">
                      <i>This is to certify that</i>
                    </span>
                    <br></br>
                    <span className="name">
                      <b>{consult?.patientName}</b>
                    </span>
                    <br />
                    <br />
                    <span className="certify">
                      <i>has successfully acquire consultation certification</i>
                    </span>
                    <br />
                    <br />
                    <span className="fs-30">from {consult?.doctorName}</span>
                    <br />
                    <br />
                    <span className="fs-20">
                      of {consult?.departmentName} <b></b>
                    </span>
                    <br></br>
                    <span className="fs-20">
                      at {consult?.hospitalName} <b></b>
                    </span>
                    <br></br>
                    <span className="fs-20">
                      Issuer {consult?.issuerName} <b></b>
                    </span>
                    <br />
                    <span className="fs-30">On {consult?.issuedDateTime}</span>
                    <br />
                    <br />
                    <br />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <SearchForm2 setcerti={setcerti} />
            <div>
              <button
                className="btn btn-primary m-2"
                onClick={() => setclose(true)}
              >
                Close
              </button>
            </div>
          </div>
          <div>
            {close ? (
              ''
            ) : (
              <div class="outer-border">
                <div class="inner-dotted-border">
                  <span class="certification">Certificate of Vaccination</span>
                  <br></br>
                  <span class="certify">
                    <i>This is to certify that</i>
                  </span>
                  <br></br>
                  <span class="name">
                    <b>{consult?.patientName}</b>
                  </span>
                  <br />
                  <br />
                  <span class="certify">
                    <i>has successfully acquire Vaccination certification</i>
                  </span>
                  <br />
                  <br />
                  <span class="fs-30">for {certi?.vaccineName}</span>
                  <br />
                  <br />
                  <span class="fs-20">
                    of {certi?.disease} <b></b>
                  </span>
                  <br></br>
                  <span class="fs-20">
                    Issuer {certi?.issuerName} <b></b>
                  </span>
                  <br />
                  <span class="fs-30">On {certi?.issuedDateTime}</span>
                  <br />
                  <br />
                  <br />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verify;
