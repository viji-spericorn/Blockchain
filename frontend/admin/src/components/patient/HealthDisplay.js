import React, { useEffect, useState } from 'react';
import './patient.css';
import { Row, Col, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { listhealthinfo } from './actions';
import HealthInformation from './HealthInformation';

const HealthDisplay = () => {
  const dispatch = useDispatch();
  const [display, setdisplay] = useState(false);
  const [edit, setedit] = useState(false);
  const [id, setid] = useState('');
  useEffect(() => {
    dispatch(listhealthinfo());
  }, []);

  const { healthdata } = useSelector((state) => state.patientReducer);

  return (
    <React.Fragment>
      <div className="m-5 cards ">
        <h1 className="p-3 hed">HealthInformation</h1>

        <div className="card-block p-2">
          <blockquote className="card-blockquote">
            {edit ? (
              <HealthInformation setedit={setedit} id={id} />
            ) : (
              <Row>
                <Col>
                  <p>Height: {healthdata?.height}</p>
                  <p>Weight: {healthdata?.weight}</p>
                </Col>
                <Col>
                  <p>BloodGroup: {healthdata?.blood}</p>
                  <p>Gender: {healthdata?.gender}</p>
                </Col>
              </Row>
            )}
          </blockquote>
        </div>
        <div className="d-flex justify-content-center m-3">
          {healthdata === null ? (
            <Button
              variant="secondary"
              style={{
                backgroundColor: '#85cde7',
              }}
              onClick={() => setdisplay(true)}
            >
              Add
            </Button>
          ) : (
            !edit && (
              <Button
                variant="warning"
                onClick={() => {
                  setedit(true);
                  setid(healthdata?.id);
                }}
              >
                Edit
              </Button>
            )
          )}
        </div>
        {display ? <HealthInformation setdisplay={setdisplay} /> : null}
      </div>
    </React.Fragment>
  );
};

export default HealthDisplay;
