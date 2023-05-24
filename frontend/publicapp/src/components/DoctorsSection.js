import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CarouselItem,
  Carousel,
} from 'react-bootstrap';
import './mystyle.css';

const DoctorsSection = () => {
  return (
    <React.Fragment>
      <section className="pb-0">
        <Container>
          <Row>
            <Col className="col-12 py-3">
              <div
                className="bg-holder bg-size"
                style={{
                  backgroundImage: `url('https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/doctors-us.png')`,
                  backgroundPosition: 'top center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <h1 className="text-center">OUR DOCTORS</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5">
        <div
          className="bg-holder bg-size"
          style={{
            backgroundImage: `url('https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/doctors-bg.png')`,
            backgroundPosition: 'top center',
            backgroundSize: 'contain',
          }}
        >
          <Container>
            <Row className="flex-center justify-content-center">
              <Col xl={10}>
                <Carousel
                  controls
                  indicators
                  className="justify-content-center"
                >
                  <CarouselItem className="justify-content-center">
                    <div className="row h-100 m-lg-7 mx-3 mt-6 mx-md-4 my-md-7">
                      <Col md={4} className="mb-8 mb-md-0">
                        <Card className="card-span h-100  shadow">
                          <Card.Body className="d-flex flex-column flex-center  py-5">
                            <img
                              src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/anita.png"
                              width="128"
                              alt="..."
                            />
                            <h5 className="mt-3 colors">
                              <strong>Anita Deshai</strong>
                            </h5>
                            <p className="mb-0 fs-xxl-1">
                              Pediatrics, Gochi Medicine
                            </p>
                            <p className="text-600 mb-0">
                              Florida, United States
                            </p>
                            <p className="text-600 mb-4">10 years experience</p>
                            <div className="text-center">
                              <Button
                                className="btn-outline-secondary rounded-pill"
                                type="submit"
                              >
                                View Profile
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4} className="mb-8 mb-md-0">
                        <Card className="card-span h-100 shadow">
                          <Card.Body className="d-flex flex-column flex-center py-5">
                            <img
                              src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/jane.png"
                              width="128"
                              alt="..."
                            />
                            <h5 className="mt-3 colors">
                              <strong>Jane kick</strong>
                            </h5>
                            <p className="mb-0 fs-xxl-1">
                              Pediatrics, Gochi Medicine
                            </p>
                            <p className="text-600 mb-0">
                              Florida, United States
                            </p>
                            <p className="text-600 mb-4">10 years experience</p>
                            <div className="text-center">
                              <Button
                                className="btn-outline-secondary rounded-pill"
                                type="submit"
                              >
                                View Profile
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4} className="mb-8 mb-md-0">
                        <Card className="card-span h-100 shadow">
                          <Card.Body className="d-flex flex-column flex-center py-5">
                            <img
                              src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/anita.png"
                              width="128"
                              alt="..."
                            />
                            <h5 className="mt-3 colors">
                              <strong>Anita Deshai</strong>
                            </h5>
                            <p className="mb-0 fs-xxl-1">
                              Pediatrics, Gochi Medicine
                            </p>
                            <p className="text-600 mb-0">
                              Florida, United States
                            </p>
                            <p className="text-600 mb-4">10 years experience</p>
                            <div className="text-center">
                              <Button
                                className="btn-outline-secondary rounded-pill"
                                type="submit"
                              >
                                View Profile
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="row h-100 m-lg-7 mx-3 mt-6 mx-md-4 my-md-7">
                      <Col md={4} className="mb-8 mb-md-0">
                        <Card className="card-span h-100 shadow">
                          <Card.Body className="d-flex flex-column  justify-content-center py-5">
                            <img
                              src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/anita.png"
                              width="128"
                              alt="..."
                            />
                            <h5 className="mt-3 colors">
                              <strong>Anita Deshai</strong>
                            </h5>
                            <p className="mb-0 fs-xxl-1">
                              Pediatrics, Gochi Medicine
                            </p>
                            <p className="text-600 mb-0">
                              Florida, United States
                            </p>
                            <p className="text-600 mb-4">10 years experience</p>
                            <div className="text-center">
                              <Button
                                className="btn-outline-secondary rounded-pill"
                                type="submit"
                              >
                                View Profile
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4} className="mb-8 mb-md-0">
                        <Card className="card-span h-100 shadow">
                          <Card.Body className="d-flex flex-column flex-center py-5">
                            <img
                              src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/jane.png"
                              width="128"
                              alt="..."
                            />
                            <h5 className="mt-3 colors">
                              <strong>Jane kick</strong>
                            </h5>
                            <p className="mb-0 fs-xxl-1">
                              Pediatrics, Gochi Medicine
                            </p>
                            <p className="text-600 mb-0">
                              Florida, United States
                            </p>
                            <p className="text-600 mb-4">10 years experience</p>
                            <div className="text-center">
                              <Button
                                className="btn-outline-secondary rounded-pill"
                                type="submit"
                              >
                                View Profile
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4} className="mb-8 mb-md-0">
                        <Card className="card-span h-100 shadow">
                          <Card.Body className="d-flex flex-column flex-center py-5">
                            <img
                              src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/anita.png"
                              width="128"
                              alt="..."
                            />
                            <h5 className="mt-3 colors">
                              <strong>Anita Deshai</strong>
                            </h5>
                            <p className="mb-0 fs-xxl-1">
                              Pediatrics, Gochi Medicine
                            </p>
                            <p className="text-600 mb-0">
                              Florida, United States
                            </p>
                            <p className="text-600 mb-4">10 years experience</p>
                            <div className="text-center">
                              <Button
                                className="btn-outline-secondary rounded-pill"
                                type="submit"
                              >
                                View Profile
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                  </CarouselItem>

                  <CarouselItem>
                    <div className="row h-100 m-lg-7 mx-3 mt-6 mx-md-4 my-md-7">
                      <Col md={4} className="mb-8 mb-md-0">
                        <Card className="card-span h-100 shadow">
                          <Card.Body className="d-flex flex-column flex-center py-5">
                            <img
                              src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/anita.png"
                              width="128"
                              alt="..."
                            />
                            <h5 className="mt-3 colors">
                              <strong>Anita Deshai</strong>
                            </h5>
                            <p className="mb-0 fs-xxl-1">
                              Pediatrics, Gochi Medicine
                            </p>
                            <p className="text-600 mb-0">
                              Florida, United States
                            </p>
                            <p className="text-600 mb-4">10 years experience</p>
                            <div className="text-center">
                              <Button
                                className="btn-outline-secondary rounded-pill"
                                type="submit"
                              >
                                View Profile
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4} className="mb-8 mb-md-0">
                        <Card className="card-span h-100 shadow">
                          <Card.Body className="d-flex flex-column flex-center py-5">
                            <img
                              src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/jane.png"
                              width="128"
                              alt="..."
                            />
                            <h5 className="mt-3 colors">
                              <strong>Jane kick</strong>
                            </h5>
                            <p className="mb-0 fs-xxl-1">
                              Pediatrics, Gochi Medicine
                            </p>
                            <p className="text-600 mb-0">
                              Florida, United States
                            </p>
                            <p className="text-600 mb-4">10 years experience</p>
                            <div className="text-center">
                              <Button
                                className="btn-outline-secondary rounded-pill"
                                type="submit"
                              >
                                View Profile
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4} className="mb-8 mb-md-0">
                        <Card className="card-span h-100 shadow">
                          <Card.Body className="d-flex flex-column flex-center py-5">
                            <img
                              src="https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/anita.png"
                              width="128"
                              alt="..."
                            />
                            <h5 className="mt-3 colors">
                              <strong>Anita Deshai</strong>
                            </h5>
                            <p className="mb-0 fs-xxl-1">
                              Pediatrics, Gochi Medicine
                            </p>
                            <p className="text-600 mb-0">
                              Florida, United States
                            </p>
                            <p className="text-600 mb-4">10 years experience</p>
                            <div className="text-center">
                              <Button
                                className="btn-outline-secondary rounded-pill"
                                type="submit"
                              >
                                View Profile
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                  </CarouselItem>
                </Carousel>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </React.Fragment>
  );
};

export default DoctorsSection;
