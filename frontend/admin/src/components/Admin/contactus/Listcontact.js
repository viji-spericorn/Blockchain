import React from 'react';
import Navbar from '../../Dashboard/Navbar';
import Sidebar from '../Sidebar';
import List from './DataTable';

const Listcontact = () => {
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
            <h2>REVIEW LIST</h2>
          </div>

          <div style={{ margin: '3rem' }}>
            <List />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listcontact;
