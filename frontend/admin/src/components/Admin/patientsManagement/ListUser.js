// import { useEffect } from 'react';
// import { Button } from 'react-bootstrap';
// import DataTable, { createTheme } from 'react-data-table-component';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import Web3 from 'web3';
// import Sidebar from '../Sidebar';
// import Navbar from '../../Dashboard/Navbar';

// import { listuser } from './action';

// createTheme(
//   'solarized',
//   {
//     text: {
//       primary: '#dfe4e8',
//       secondary: '#f5fafa',
//     },
//     background: {
//       default: '#002b36',
//     },
//     context: {
//       background: '#cb4b16',
//       text: '#FFFFFF',
//     },
//     divider: {
//       default: '#dfe4e8',
//     },
//     action: {
//       button: 'rgba(0,0,0,.54)',
//       hover: 'rgba(0,0,0,.08)',
//       disabled: 'rgba(0,0,0,.12)',
//     },
//   },
//   'dark'
// );

// function Lists() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(listuser());
//   }, []);

//   const { userdata } = useSelector((state) => state.userReducers);
//   console.log('userdata', userdata);

//   const columns = [
//     {
//       name: 'Patient Name',
//       selector: (row) => row.user?.name,
//       center: true,
//     },
//     {
//       name: 'Appointed Doctor',
//       selector: (row) => row.doctor?.name,
//       center: true,
//     },
//     {
//       name: 'Hospital',
//       selector: (row) => row.hospital?.name,
//       center: true,
//     },
//     {
//       name: 'Department',
//       selector: (row) => row.department?.name,
//       center: true,
//     },
//     {
//       name: 'Time',
//       selector: (row) => row.time,
//       center: true,
//     },
//   ];
//   return (
//     <div className="dashboard d-flex">
//       <div>
//         <Sidebar />
//       </div>
//       <div
//         style={{
//           flex: '1 1 auto',
//           display: 'flex',
//           flexFlow: 'column',
//           height: '100vh',
//           overflowY: 'scroll',
//         }}
//       >
//         <Navbar />
//         <div>
//           <div className="intro text-center m-5 headd">
//             <h2>Patient List</h2>
//           </div>

//           <div style={{ margin: '3rem' }}>
//             <div className="table-container">
//               <DataTable
//                 columns={columns}
//                 data={userdata ? userdata : []}
//                 pagination
//                 theme="solarized"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Lists;
