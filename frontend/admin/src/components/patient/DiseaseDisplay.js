import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteData } from '../../api/services';
import { listdiseaseinfo } from './actions';
import DiseaseForm from './DiseaseInfo';
import './patient.css';

const DiseaseDisplay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [display, setdisplay] = useState(false);
  useEffect(() => {
    dispatch(listdiseaseinfo());
  }, []);
  const { diseasedata } = useSelector((state) => state.patientReducer);
  console.log('diseasedata', diseasedata);
  return (
    <div className="m-5 cards ">
      <h1 className="p-3 hed">DiseaseInformation</h1>
      <div className="d-flex justify-content-center">
        <Button
          variant="secondary"
          style={{ backgroundColor: '#85cde7' }}
          onClick={() => setdisplay(true)}
        >
          Add
        </Button>
      </div>
      {display ? <DiseaseForm setdisplay={setdisplay} /> : null}
      <div className="card-block p-3">
        <blockquote className="card-blockquote">
          <Row>
            {diseasedata?.map((data, index) => {
              return (
                <>
                  <Col>
                    <p>DiseaseName: {data?.diseaseName}</p>
                    <Col>
                      <p>Remarks: {data?.remarks}</p>
                    </Col>
                    <Col>
                      <p>StartDate: {data?.startDate}</p>
                    </Col>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteData('/patient', data.id).then(() => {
                          dispatch(listdiseaseinfo());
                        });
                        navigate('/profile');
                      }}
                    >
                      Delete
                    </Button>
                    <hr />
                  </Col>
                </>
              );
            })}
          </Row>
        </blockquote>
      </div>
    </div>
  );
};

export default DiseaseDisplay;
