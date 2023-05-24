import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../patient/patient.css';
import Navbar from '../Dashboard/Navbar';
import Sidebar from './Sidebar';
import { basicinfos } from '../Auth/action';

const ProfilePages = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(basicinfos());
  }, []);

  const { basicdata } = useSelector((state) => state.authReducer);

  console.log('basicdata', basicdata);

  // Styling for the profile section
  const profileStyle = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    width: '65%',
    marginTop: '50px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  // Styling for the heading
  const headingStyle = {
    marginBottom: '20px',
    fontSize: '30px',
    cursor: 'pointer',
  };

  // Styling for the information
  const infoStyle = {
    marginBottom: '10px',
    fontSize: '16px',
  };

  return (
    <div className="dashboard d-flex">
      <div>
        <Sidebar />
      </div>
      <div
        style={{
          flex: '1 1 auto', // Flex properties for the outer container
          display: 'flex',
          flexFlow: 'column',
          height: '100vh',
          overflowY: 'scroll',
        }}
      >
        <Navbar />
        <div>
          <Container className="mt-10">
            <Row className="row d-flex justify-content-center align-items-center h-100">
              <Col md={6} style={profileStyle}>
                <Row style={{ justifyContent: 'center' }}>
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/administrator-5665446-4781309.png?f=webp"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                  />
                </Row>
                <Row>
                  <Col>
                    <div className="hed" style={headingStyle}>
                      Basic Information
                      <span
                        style={{ fontSize: '20px', marginLeft: '1%' }}
                      ></span>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <p style={infoStyle}>Name: {basicdata?.name}</p>
                    <p style={infoStyle}>
                      Contact Number: {basicdata?.phoneNumber}
                    </p>
                    <p style={infoStyle}>DOB: {basicdata?.dob}</p>
                    <p style={infoStyle}>Location: {basicdata?.address}</p>
                  </Col>
                  <Col>
                    <p style={infoStyle}>
                      Aadhar Number: {basicdata?.aadharNumber}
                    </p>
                    <p style={infoStyle}>Email: {basicdata?.login?.email}</p>
                    <p style={infoStyle}>State: {basicdata?.state}</p>
                    <p style={infoStyle}>Country: {basicdata?.country}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};
export default ProfilePages;
