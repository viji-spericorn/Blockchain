import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HealthcareSection = () => {
  return (
    <section className="py-5">
      <div
        className="bg-holder bg-size"
        style={{
          backgroundImage: `url('https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/about-bg.png')`,
          backgroundPosition: 'top center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6} order-lg={1} className="mb-5 mb-lg-0">
              <img
                className="fit-cover rounded-circle w-100"
                src="https://cdni.iconscout.com/illustration/premium/thumb/delivery-pharmacy-service-7236543-5901203.png?f=webp"
                alt="Healthcare"
              />
            </Col>
            <Col md={6} className="text-center text-md-start">
              <h2 className="fw-bold mb-4 m-lg-5">
                <strong style={{ color: '#283779' }}>
                  We are developing a healthcare
                  <br className="d-none d-sm-block" />
                  system around you
                </strong>
              </h2>
              <p className="m-lg-5">
                We think that everyone should have easy access to excellent
                <br className="d-none d-sm-block" />
                healthcare. Our aim is to make the procedure as simple as
                <br className="d-none d-sm-block" />
                possible for our patients and to offer treatment no matter
                <br className="d-none d-sm-block" />
                where they are — in person or at their convenience.
              </p>
              <div className="py-3 m-lg-5">
                <Button
                  className="btn-lg btn-outline-primary rounded-pill"
                  type="submit"
                >
                  Learn more
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default HealthcareSection;
