import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const EyeCareSection = () => {
  return (
    <section className="" style={{ backgroundColor: '#283779' }}>
      <div
        className="bg-holder"
        style={{
          backgroundImage: `url('https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/bg-eye-care.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }}
      ></div>

      <Container>
        <Row className="align-items-center">
          <Col md={5} xxl={6}>
            <img
              className="img-fluid "
              src="https://cdni.iconscout.com/illustration/premium/thumb/eye-vision-testing-chart-4047422-3351737.png?f=webp"
              alt="..."
            />
          </Col>
          <Col md={7} xxl={6} className="text-center text-md-start ">
            <h2 className="fw-bold text-light mb-4 mt-4 mt-lg-4">
              Eye Care with Top Professionals
              <br className="d-none d-sm-block" />
              and In Budget.
            </h2>
            <p className="text-light">
              We've built a healthcare system that puts your needs first.
              <br className="d-none d-sm-block" />
              For us, there is nothing more important than the health of{' '}
              <br className="d-none d-sm-block" />
              you and your loved ones.
            </p>
            <div className="py-3">
              <Button variant="light" size="lg" rounded-pill href="#!">
                Learn more
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EyeCareSection;
