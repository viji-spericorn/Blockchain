import React, { useRef, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Navigation = () => {
  return (
    <>
      <Navbar
        expand="lg"
        variant="light"
        fixed="top"
        className="d-block"
        data-navbar-on-scroll="data-navbar-on-scroll"
        style={{ backgroundColor: '#daf0f8' }}
      >
        <Container>
          <Navbar.Brand href="index.html">
            <a
              href="/"
              className="text-decoration-none m-lg-2"
              style={{ color: '#283779', fontSize: '20px' }}
            >
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/bubbles/100/heart-with-pulse.png"
                alt="heart-with-pulse"
              />
              Medico
            </a>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarSupportedContent"
            aria-label="Toggle navigation"
          />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav
              className="ms-auto pt-2 pt-lg-0 font-base"
              style={{ color: '#1b71a1', fontSize: '16px' }}
            >
              <Nav.Link href="/">About Us</Nav.Link>

              <Nav.Link href="/">Departments</Nav.Link>
              <Nav.Link href="/">Doctors</Nav.Link>
              <Nav.Link href="/">Services</Nav.Link>
              <Nav.Link href="/">Contact</Nav.Link>
              <Nav.Link href="/verifiyCertificates">
                verifiyCertificates
              </Nav.Link>
            </Nav>
            <a
              className="btn btn-sm btn-outline-primary rounded-pill order-1 order-lg-0 ms-lg-4"
              href="http://localhost:3001/signup"
            >
              SignUp
            </a>
            <a
              className="btn btn-sm btn-outline-primary rounded-pill order-1 order-lg-0 ms-lg-4"
              href="http://localhost:3001/"
            >
              Log In
            </a>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
