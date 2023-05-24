import React from 'react';

import Navbar from '../Dashboard/Navbar';
import CardsContainer from '../patient/Dashboards.js/CardContainer';
import Sidebar from './Sidebar';

const MainPage = () => {
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

export default MainPage;
