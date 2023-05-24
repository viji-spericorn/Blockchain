import React from 'react';
import { Container, Button, Row, Col, Image } from 'react-bootstrap';
import './mystyle.css';

const HeroSection = () => {
  return (
    <Container className="containerabout container mb-5">
      <section className="about" id="about">
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={6} className="p-5">
            <Image
              src="https://www.eesassin.com/img_external/revolution-slider/med.gif"
              className="image w-100 p-3"
            />
          </Col>
          <Col xs={12} md={6}>
            <div className="content m-md-5">
              <h1 className="content">
                We're <strong className="colors">determined</strong> for your
                <br />
                &nbsp;<strong className="colors">better life.</strong>
              </h1>
              <p className="contents">
                You can get the care you need 24/7 – be it online or in <br />
                person. You will be treated by caring specialist doctors.{' '}
              </p>
              <Button
                className="btn-lg btn-primary rounded-pill"
                href="#!"
                role="button"
              >
                Make an Appointment
              </Button>
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default HeroSection;
