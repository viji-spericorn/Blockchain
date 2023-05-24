import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutSection = () => {
  return (
    <section className="pb-0 mt-lg-5" id="about">
      <Container>
        <Row>
          <Col className="col-12 py-3">
            <div
              className="bg-holder bg-size"
              style={{
                backgroundImage: `url('https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/about-us.png')`,
                backgroundPosition: 'top center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <h1 className="text-center">ABOUT US</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
