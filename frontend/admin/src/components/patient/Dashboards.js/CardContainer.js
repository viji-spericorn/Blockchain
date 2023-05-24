import './cards.css';
import { useDispatch, useSelector } from 'react-redux';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import { listconsult } from '../consultation/actions';
import { listdiseaseinfo } from '../actions';
const CardsContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listconsult());
  }, []);
  useEffect(() => {
    dispatch(listdiseaseinfo());
  }, []);

  const { consultdata } = useSelector((state) => state.consultReducers);
  const { diseasedata } = useSelector((state) => state.patientReducer);

  const consult = consultdata?.length;
  const dis = diseasedata?.length;

  return (
    <div className="container">
      <div className="row flex-containers">
        <div className="m-5">
          <MDBCard>
            <MDBCardBody className="fs-2 text-primary">
              Welcome!!!<i className="fa-solid fa-handshake"></i>
            </MDBCardBody>
          </MDBCard>
        </div>
        {/* Card 1 */}
        <div className="col-md-12 flex-items m-5">
          <div className="flex-item-innerss">
            <div className="card-fronts bg-violet">
              <i className="fa-solid fa-people-arrows fa-3x tile-icon icon-white"></i>
              <h4>No of Consultation</h4>
              <p className="detail">{consult}</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-12 flex-items m-5">
          <div className="flex-item-inners">
            <div className="card-fronts bg-magenta">
              <i className="fa-solid fa-disease tile-icon fs-2 icon-white"></i>
              <h4>No of Disease</h4>
              <p className="detail">{dis}</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-12 flex-items m-5">
          <div className="flex-item-inners">
            <div className="card-fronts bg-blue">
              <i className="fa-solid fa-money-check-dollar fs-2 tile-icon icon-white"></i>
              <h4>Total Payment</h4>
              <p className="detail">$XXX,XXX</p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-md-12 flex-items m-5">
          <div className="flex-item-inners">
            <div className="card-fronts bg-green">
              <i className="fa-solid fa-syringe fs-2 tile-icon icon-white"></i>
              <h4>Vaccination Taken</h4>
              <p className="detail">$XXX,XXX</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsContainer;
