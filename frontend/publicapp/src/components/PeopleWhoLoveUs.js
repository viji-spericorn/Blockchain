import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const PeopleWhoLoveUs = () => {
  return (
    <section className="py-5 mt-lg-4">
      <Container>
        <Row>
          <Col className="py-3">
            <div
              className="bg-holder bg-size"
              style={{
                backgroundImage: `url('https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/people.png')`,
                backgroundPosition: 'top center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <h1 className="text-center">PEOPLE WHO LOVE US</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PeopleWhoLoveUs;
