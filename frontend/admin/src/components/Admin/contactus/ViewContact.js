import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { getbyidContactus } from './actions';
import Sidebar from '../../Dashboard/Sidebar';
import Navbar from '../../Dashboard/Navbar';

//detailed view of review messages
const DetailList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getbyidContactus(id));
  }, []);

  const { contactus } = useSelector((state) => state.contactReducers);
  console.log('contactus', contactus);
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
        <div className="m-4 headd">
          <Card className="text-center">
            <Card.Header>Readed</Card.Header>
            <Card.Body>
              <Card.Title>Message By: {contactus.name}</Card.Title>
              <Card.Text>{contactus.message}</Card.Text>
              <Button as={Link} to="/enquiry" variant="primary">
                Back
              </Button>
            </Card.Body>
            <Card.Footer className="text-muted">
              sent at::{contactus.createdAt}
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailList;
