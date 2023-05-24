import React from 'react';
import { Container, Row, Col, Carousel, CarouselItem } from 'react-bootstrap';
import './mystyle.css';

const Testimonials = () => {
  return (
    <section className="py-8">
      <div
        className="bg-holder bg-size "
        style={{
          backgroundImage: `url('https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/people-bg-1.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container className="container ">
          <Row className="align-items-center">
            <Col>
              <Carousel id="carouselPeople" controls={false}>
                <CarouselItem interval={10000}>
                  <Row className="h-100 m-lg-5">
                    <Col sm={3} className="text-center mt-lg-4">
                      <img
                        src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/people-who-loves.png"
                        width="100"
                        alt=""
                      />
                      <h5 className="mt-3 fw-medium clr">Edward Newgate</h5>
                      <p className="fw-normal mb-0 clr">Founder Circle</p>
                    </Col>
                    <Col
                      sm={9}
                      className="text-center text-sm-start pt-3  pt-sm-0 mt-lg-4"
                    >
                      <h2 className="colors">Fantastic Response!</h2>
                      <div className="my-2 clr">
                        <i className="fas fa-star me-2"></i>
                        <i className="fas fa-star me-2"></i>
                        <i className="fas fa-star me-2"></i>
                        <i className="fas fa-star-half-alt me-2"></i>
                        <i className="far fa-star"></i>
                      </div>
                      <p className="clr">
                        This medical and health care facility distinguishes
                        itself from the competition by providing technologically
                        advanced medical and health care. A mobile app and a
                        website are available via which you can easily schedule
                        appointments, get online consultations, and see
                        physicians, who will assist you through the whole
                        procedure. And all of the prescriptions, medications,
                        and other services they offer are 100% genuine,
                        medically verified, and proved. I believe that the
                        Livedoc staff is doing an outstanding job. Highly
                        recommended their health care services.
                      </p>
                    </Col>
                  </Row>
                </CarouselItem>
                <CarouselItem interval={2000}>
                  <Row className="h-100 m-lg-5">
                    <Col sm={3} className="text-center mt-lg-4">
                      <img
                        src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/people-who-loves.png"
                        width="100"
                        alt=""
                      />
                      <h5 className="mt-3 fw-medium clr">Jhon Doe</h5>
                      <p className="fw-normal mb-0 clr">UI/UX Designer</p>
                    </Col>
                    <Col className="text-center text-sm-start pt-3 pt-sm-0 mt-lg-4">
                      <h2 className="colors">Fantastic Response!</h2>
                      <div className="my-2 clr">
                        <i className="fas fa-star me-2"></i>
                        <i className="fas fa-star me-2"></i>
                        <i className="fas fa-star me-2"></i>
                        <i className="fas fa-star-half-alt me-2"></i>
                        <i className="far fa-star"></i>
                      </div>
                      <p className="clr">
                        This medical and health care facility distinguishes
                        itself from the competition by providing technologically
                        advanced medical and health care. A mobile app and a
                        website are available via which you can easily schedule
                        appointments, get online consultations, and see
                        physicians, who will assist you through the whole
                        procedure. And all of the prescriptions, medications,
                        and other services they offer are 100% genuine,
                        medically verified, and proved. I believe that the
                        Livedoc staff is doing an outstanding job. Highly
                        recommended their health care services.
                      </p>
                    </Col>
                  </Row>
                </CarouselItem>
                <CarouselItem>
                  <Row className="h-100 m-lg-5 ">
                    <Col sm={3} className="text-center mt-lg-4">
                      <img
                        src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/people-who-loves.png"
                        width="100"
                        alt=""
                      />
                      <h5 className="mt-3 fw-medium clr">Jeny Doe</h5>
                      <p className="fw-normal mb-0 clr">Web Designer</p>
                    </Col>
                    <Col
                      sm={9}
                      className="text-center text-sm-start pt-3 pt-sm-0 mt-lg-4 "
                    >
                      <h2 className="colors">Fantastic Response!</h2>
                      <div className="my-2 clr">
                        <i className="fas fa-star me-2"></i>
                        <i className="fas fa-star me-2"></i>
                        <i className="fas fa-star me-2"></i>
                        <i className="fas fa-star-half-alt me-2"></i>
                        <i className="far fa-star"></i>
                      </div>
                      <p className="clr">
                        This medical and health care facility distinguishes
                        itself from the competition by providing technologically
                        advanced medical and health care. A mobile app and a
                        website are available via which you can easily schedule
                        appointments, get online consultations, and see
                        physicians, who will assist you through the whole
                        procedure. And all of the prescriptions, medications,
                        and other services they offer are 100% genuine,
                        medically verified, and proved. I believe that the
                        Livedoc staff is doing an outstanding job. Highly
                        recommended their health care services.
                      </p>
                    </Col>
                  </Row>
                </CarouselItem>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Testimonials;
