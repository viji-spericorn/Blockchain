import React, { useEffect } from 'react';
import Navbar from '../../Dashboard/Navbar';
import Sidebar from '../../Dashboard/Sidebar';
import List from './ListPayment';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ListPayment = () => {
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
            <h2>Transaction Details</h2>
          </div>

          <div style={{ margin: '3rem' }}>
            <List />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPayment;
