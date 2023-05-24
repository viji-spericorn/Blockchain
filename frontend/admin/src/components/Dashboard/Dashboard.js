import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import CardsContainer from '../patient/Dashboards.js/CardContainer';

const Dashboard = () => {
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
          overflowY: 'hidden',
        }}
      >
        <Navbar />
        <div>
          <CardsContainer />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
