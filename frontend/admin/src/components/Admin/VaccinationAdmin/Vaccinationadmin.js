import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import Sidebar from '../Sidebar';
import Navbar from '../../Dashboard/Navbar';
import { vaccineCertificate } from './action';
import wrappedTokenDeposit from '../../blockChain/vaccinationCertificate';
import { listvaccination } from '../../patient/Vaccination/action';

createTheme(
  'solarized',
  {
    text: {
      primary: '#dfe4e8',
      secondary: '#f5fafa',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#dfe4e8',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  },
  'dark'
);

function ListVaccine() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listvaccination());
  }, []);

  const { vaccinedata } = useSelector((state) => state.vaccineReducers);

  const handleAction = async (row) => {
    // Perform action for the selected row
    console.log('row', row);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const netVer = await web3.eth.net.getId();
    localStorage.setItem('walletAddress', accounts[0]);

    const certificationValues = {
      patientName: row?.user?.name,
      patientUUID: row?.user?.aadharNumber,
      patientRegId: row?.userId,
      vaccineName: row?.vaccine?.name,
      vaccineTakenDatetime: new Date(
        `${row.date} ${row.time.slice(0, 5)}`
      ).getTime(),
      disease: row?.vaccine?.disease,
      antigen: row?.vaccine?.antigen,
      issuerName: row?.hospital?.name,
      issuerId: row?.hospital.id.slice(0, 32),
      issuedDateTime: new Date().getTime(),
    };
    console.log('certificationValuesMainPage', certificationValues);
    try {
      const wrapper = await wrappedTokenDeposit({
        web3,
        address: accounts[0],
        netVer,
        certificationValues,
      });
      console.log('wrapper', wrapper);
      dispatch(vaccineCertificate(wrapper));
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: 'Patient Name',
      selector: (row) => row.user?.name,
      center: true,
    },
    {
      name: 'Hospital Name',
      selector: (row) => row.hospital?.name,
      center: true,
    },
    {
      name: 'Vaccine',
      selector: (row) => row.vaccine?.name,
      center: true,
    },
    {
      name: 'Time',
      selector: (row) => row.time,
      center: true,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
      center: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      center: true,
    },
    {
      name: 'Action',
      style: {
        fontSize: '18px',
        text: 'center', // Sets font size to 18px
      },
      selector: (row) => (
        <div className="d-flex">
          {row.status !== 'taken' ? (
            ''
          ) : (
            <Button className="m-1" onClick={() => handleAction(row)}>
              <i className="fa-regular fa-file fa-2"></i>
            </Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <div className="dashboard d-flex">
      <div>
        <Sidebar />
      </div>
      <div
        style={{
          flex: '1 1 auto',
          display: 'flex',
          flexFlow: 'column',
          height: '100vh',
          overflowY: 'scroll',
        }}
      >
        <Navbar />
        <div>
          <div className="intro text-center m-5 headd">
            <h2>Vaccination List</h2>
          </div>

          <div style={{ margin: '3rem' }}>
            <div className="table-container">
              <DataTable
                columns={columns}
                data={vaccinedata ? vaccinedata : []}
                pagination
                theme="solarized"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListVaccine;
