import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './mystyle.css';

const Footer = () => {
  return (
    <section className="py-0 foot ">
      <div
        className="bg-holder m-5"
        style={{
          backgroundImage: `url('https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/dot-bg.png')`,
          backgroundPosition: 'top left',
          marginTop: '-3.125rem',
          backgroundSize: 'auto',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {' '}
        <div className="container">
          <div className="row py-8">
            <div className="col-12 col-sm-12 col-lg-6 mb-4 order-0 order-sm-0 ">
              <a className="text-decoration-none m-5" href="#">
                <img
                  className="mt-5"
                  src="https://img.icons8.com/bubbles/100/heart-with-pulse.png"
                  height="68"
                  width="68"
                  alt=""
                />
              </a>
              <p className="text-light my-4 ">
                The world's most trusted <br />
                telehealth company.
              </p>
            </div>
            <div className="col-6 col-sm-4 col-lg-2 mb-3 order-2 order-sm-1 m-5">
              <h5 className="lh-lg fw-bold mb-4 text-light font-sans-serif">
                Departments
              </h5>
              <ul className="list-unstyled mb-md-4 mb-lg-0">
                <li className="lh-lg">
                  <a
                    className="footer-link text-decoration-none text-white"
                    href="/"
                  >
                    Eye care
                  </a>
                </li>
                <li className="lh-lg">
                  <a
                    className="footer-link text-decoration-none text-white"
                    href="/"
                  >
                    Cardiac care
                  </a>
                </li>
                <li className="lh-lg">
                  <a
                    className="footer-link text-decoration-none text-white"
                    href="/"
                  >
                    Heart care
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-6 col-sm-4 col-lg-2 mb-3 order-3 order-sm-2 mt-5 ">
              <h5 className="lh-lg fw-bold text-light mb-4 ">Customer Care</h5>
              <ul className="list-unstyled mb-md-4 mb-lg-0">
                <li className="lh-lg">
                  <a
                    className="footer-link text-decoration-none text-white"
                    href="#!"
                  >
                    About Us
                  </a>
                </li>
                <li className="lh-lg">
                  <a
                    className="footer-link text-decoration-none text-white"
                    href="#!"
                  >
                    Contact Us
                  </a>
                </li>
                <li className="lh-lg">
                  <a
                    className="footer-link text-decoration-none text-white"
                    href="/"
                  >
                    <i className="fa fa-phone"></i>0471-2253674
                  </a>
                </li>
                <li className="lh-lg">
                  <a
                    className="footer-link text-decoration-none text-white "
                    href="/"
                  >
                    <i className="fa fa-envelope">medicocare@gmail.com</i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section>
        <section className="py-0 bgclr">
          <Container>
            <Row className="justify-content-md-between justify-content-evenly py-4">
              <Col md="auto" className="text-center text-md-start text-white">
                <p className="fs--1 my-2 fw-bold text-200">
                  All rights Reserved © Medico, 2023
                </p>
              </Col>
              <Col md={6}>
                <p className="fs--1 my-2 text-center text-md-end text-200 text-white">
                  Made with&nbsp;
                  <svg
                    className="bi bi-suit-heart-fill"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="#F95C19"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"></path>
                  </svg>
                  &nbsp;by&nbsp;
                  <a className="fw-bold text-info" href="/">
                    Medico
                  </a>
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </section>
    </section>
  );
};

export default Footer;
