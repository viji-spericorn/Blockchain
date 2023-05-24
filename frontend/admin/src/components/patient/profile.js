import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './patient.css';
import { basicinfo } from './actions/index';
import Navbar from '../Dashboard/Navbar';
import Sidebar from '../Dashboard/Sidebar';
import DiseaseDisplay from './DiseaseDisplay';
import HealthDisplay from './HealthDisplay';
import BasicInfo from './BasicInfo';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [edit, setedit] = useState(false);
  const [id, setid] = useState('');

  useEffect(() => {
    dispatch(basicinfo());
  }, []);

  const { basicdata } = useSelector((state) => state.patientReducer);

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
                    src="https://cdn.hashnode.com/res/hashnode/image/upload/v1629656187765/TjC4Ldxsy.png?auto=compress,format&format=webp"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                  />
                </Row>
                <Row>
                  <Col>
                    <div
                      className="hed"
                      style={headingStyle}
                      onClick={() => console.log('getit')}
                    >
                      Basic Information
                      <span style={{ fontSize: '20px', marginLeft: '1%' }}>
                        {edit ? null : (
                          <i
                            className="fas fa-edit"
                            onClick={() => {
                              setedit(true);
                              setid(basicdata.id);
                            }}
                          ></i>
                        )}
                      </span>
                    </div>
                  </Col>
                </Row>
                {edit ? (
                  <BasicInfo setedit={setedit} id={id} />
                ) : (
                  <Row>
                    <Col>
                      <p style={infoStyle}>Name: {basicdata.name}</p>
                      <p style={infoStyle}>
                        Contact Number: {basicdata.phoneNumber}
                      </p>
                      <p style={infoStyle}>DOB: {basicdata.dob}</p>
                      <p style={infoStyle}>Location: {basicdata.address}</p>
                    </Col>
                    <Col>
                      <p style={infoStyle}>
                        Aadhar Number: {basicdata.aadharNumber}
                      </p>
                      <p style={infoStyle}>Email: {basicdata?.login?.email}</p>
                      <p style={infoStyle}>State: {basicdata.state}</p>
                      <p style={infoStyle}>Country: {basicdata.country}</p>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Container>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div>
            <HealthDisplay />
          </div>
          <div>
            <DiseaseDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
