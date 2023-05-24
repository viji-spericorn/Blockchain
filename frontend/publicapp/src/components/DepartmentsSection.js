import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const DepartmentsSection = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-12 py-3">
            <div
              className="bg-holder bg-size"
              style={{
                backgroundImage: `url('https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/bg-departments.png')`,
                backgroundPosition: 'top center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <h1 className="text-center fs-1">OUR DEPARTMENTS</h1>
            </div>
          </div>
        </div>
      </div>
      <section className="py-0">
        <Container>
          <Row className="py-5 align-items-center justify-content-center justify-content-lg-evenly">
            <Col xs="auto" md="4" lg="auto" xl="auto" className="text-xl-start">
              <div className="d-flex flex-column align-items-center">
                <div className="icon-box text-center">
                  <a className="text-decoration-none" href="#!">
                    <img
                      className="mb-3 deparment-icon-hover"
                      src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/icons/neurology.svg"
                      alt="neurology-hover"
                    />
                    <p className="fs-4 fs-xxl-2 text-center">Neurology</p>
                  </a>
                </div>
              </div>
            </Col>
            <Col xs="auto" md="4" lg="auto" xl="auto" className="text-xl-start">
              <div className="d-flex flex-column align-items-center">
                <div className="icon-box text-center">
                  <a className="text-decoration-none" href="#!">
                    <img
                      className="mb-3 deparment-icon-hover"
                      src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/icons/eye-care.svg"
                      alt="neurology-hover"
                    />
                    <p className="fs-4 fs-xxl-2 text-center">Eye Care</p>
                  </a>
                </div>
              </div>
            </Col>
            <Col xs="auto" md="4" lg="auto" xl="auto" className="text-xl-start">
              <div className="d-flex flex-column align-items-center">
                <div className="icon-box text-center">
                  <a className="text-decoration-none" href="#!">
                    <img
                      className="mb-3 deparment-icon-hover"
                      src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/icons/cardiac.svg"
                      alt="neurology-hover"
                    />
                    <p className="fs-4 fs-xxl-2 text-center">Cardiac Care</p>
                  </a>
                </div>
              </div>
            </Col>
            <Col xs="auto" md="4" lg="auto" xl="auto" className="text-xl-start">
              <div className="d-flex flex-column align-items-center">
                <div className="icon-box text-center">
                  <a className="text-decoration-none" href="#!">
                    <img
                      className="mb-3 deparment-icon-hover"
                      src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/icons/osteoporosis.svg"
                      alt="neurology-hover"
                    />
                    <p className="fs-4 fs-xxl-2 text-center">Osteoporosis</p>
                  </a>
                </div>
              </div>
            </Col>
            <Col xs="auto" md="4" lg="auto" xl="auto" className="text-xl-start">
              <div className="d-flex flex-column align-items-center">
                <div className="icon-box text-center">
                  <a className="text-decoration-none" href="#!">
                    <img
                      className="mb-3 deparment-icon-hover"
                      src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/icons/ent.svg"
                      alt="neurology-hover"
                    />
                    <p className="fs-4 fs-xxl-2 text-center">ENT</p>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default DepartmentsSection;
