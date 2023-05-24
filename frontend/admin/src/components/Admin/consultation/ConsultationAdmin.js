import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import Sidebar from '../Sidebar';
import Navbar from '../../Dashboard/Navbar';
import { listconsult } from '../../patient/consultation/actions/index';
import { consultationCertificate, getconsultByID } from './action';
import wrappedTokenDeposit from '../../blockChain/consultationCertificate';

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

function List() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listconsult());
  }, []);

  const { consultdata } = useSelector((state) => state.consultReducers);
  // const { consultbyid } = useSelector((state) => state.consultationReducer);

  console.log('consultdata', consultdata);
  // console.log('consultbyid', consultbyid);

  const handleAction = async (row) => {
    // Perform action for the selected row
    console.log('row', row);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const netVer = await web3.eth.net.getId();
    localStorage.setItem('walletAddress', accounts[0]);

    const certificationValues = {
      patientName: row.user?.name,
      patientUUID: row?.user?.aadharNumber,
      patientRegId: row?.userId,
      doctorName: row?.doctor?.name,
      consultationTime: new Date(
        `${row.date} ${row.time.slice(0, 5)}`
      ).getTime(),
      departmentName: row?.department?.name,
      hospitalName: row?.hospital?.name,
      issuerName: row?.hospital?.name,
      issuerId: row.hospital.id.slice(0, 32),
      issuedDateTime: Math.floor(new Date().getTime() / 1000.0),
    };
    console.log('certificationValuesMainPage', certificationValues);
    const wrapper = await wrappedTokenDeposit({
      web3,
      address: accounts[0],
      netVer,
      certificationValues,
    });
    console.log('wrapper', wrapper);
    dispatch(consultationCertificate(wrapper));
  };

  const columns = [
    {
      name: 'Patient Name',
      selector: (row) => row.user?.name,
      center: true,
    },
    {
      name: 'Appointed Doctor',
      selector: (row) => row.doctor?.name,
      center: true,
    },
    {
      name: 'Hospital',
      selector: (row) => row.hospital?.name,
      center: true,
    },
    {
      name: 'Department',
      selector: (row) => row.department?.name,
      center: true,
    },
    {
      name: 'Time',
      selector: (row) => row.time,
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
          {row.status !== 'consulted' ? (
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
            <h2>Consultation List</h2>
          </div>

          <div style={{ margin: '3rem' }}>
            <div className="table-container">
              <DataTable
                columns={columns}
                data={consultdata ? consultdata : []}
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

export default List;
