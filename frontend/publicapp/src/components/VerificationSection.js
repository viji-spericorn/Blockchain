import React, { useState } from 'react';
import Web3 from 'web3';
import consultationCertificateVerificationFunction from '../blockchain/certificateVerificationFunction';
import certificateVerificationFunction from '../blockchain/vaccinationCertificateVerify';

function SearchForm1() {
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
    // Perform search logic or send search query to backend
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
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
}

function SearchForm2() {
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
    // Perform search logic or send search query to backend
    console.log('Form 2 submitted with search query:', datas);
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
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
}

function Verify() {
  return (
    <div>
      <div className="container justify-content-center">
        <h1>Verify your Certificates</h1>

        <div>
          <SearchForm1 />
        </div>
        <div>
          <SearchForm2 />
        </div>
      </div>
    </div>
  );
}

export default Verify;
