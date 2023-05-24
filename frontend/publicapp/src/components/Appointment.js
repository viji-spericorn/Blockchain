import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import Joi from 'joi';
import { submitenquiry } from '../actions';

const Appointment = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    inputName: '',
    inputPhone: '',
    inputEmail: '',
    validationTextarea: '',
  });
  const [errors, setErrors] = useState({});
  const schema = Joi.object({
    inputName: Joi.string()
      .min(3)
      .max(30)
      .required()
      .pattern(/^[a-zA-Z]+$/)
      .label('Name')
      .messages({
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must not exceed 30 characters',
      }),
    inputPhone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .label('Phone')
      .messages({
        'string.pattern.base':
          'Phone number must be 10 digits without spaces or special characters',
      }),
    inputEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label('Email'),
    validationTextarea: Joi.string()
      .min(5)
      .max(200)
      .required()
      .label('Message')
      .messages({
        'string.min': 'Message must be at least 10 characters long',
        'string.max': 'Message cannot exceed 200 characters',
      }),
  });

  const validateForm = () => {
    const result = schema.validate(formValues, { abortEarly: false });
    if (!result.error) {
      setErrors({});
      return true;
    }

    const newErrors = {};
    result.error.details.forEach((error) => {
      newErrors[error.path[0]] = error.message;
    });
    setErrors(newErrors);
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform form submission logic here
      dispatch(submitenquiry(formValues));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <React.Fragment>
      <section className="py-5">
        <Container>
          <Row>
            <Col className="col-12 py-3">
              <div className="bg-holder bg-size">
                <h1 className="text-center">ENQURIES</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-8">
        <Container>
          <Row>
            <div
              className="bg-holder bg-size"
              style={{
                backgroundImage: `url('https://themewagon.github.io/live-doc/v1.0.0/assets/img/gallery/dot-bg.png')`,
                backgroundPosition: 'bottom right',
                backgroundSize: 'auto',
              }}
            ></div>

            <Col lg={6} className="z-index-2 mb-5">
              <img
                className="w-100 mt-4 "
                src="https://cdni.iconscout.com/illustration/premium/thumb/customer-care-3483602-2912019.png"
                alt="..."
              />
            </Col>
            <Col lg={6} className="z-index-2">
              <Form onSubmit={handleSubmit} className="mt-5">
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="inputName">
                      <Form.Control
                        type="text"
                        name="inputName"
                        placeholder="Name"
                        value={formValues.inputName}
                        onChange={handleChange}
                        isInvalid={errors.inputName}
                      />
                      <Form.Label className="visually-hidden">Name</Form.Label>
                      <Form.Text type="invalid" className="text-danger">
                        {errors.inputName}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="inputPhone">
                      <Form.Control
                        type="text"
                        placeholder="Phone"
                        name="inputPhone"
                        value={formValues.inputPhone}
                        onChange={handleChange}
                        isInvalid={errors.inputPhone}
                      />
                      <Form.Label className="visually-hidden">Phone</Form.Label>
                      <Form.Text type="invalid" className="text-danger">
                        {errors.inputPhone}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="inputEmail">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        name="inputEmail"
                        value={formValues.inputEmail}
                        onChange={handleChange}
                        className="form-livedoc-control"
                        isInvalid={errors.inputEmail}
                      />
                      <Form.Label className="form-label visually-hidden">
                        Email
                      </Form.Label>
                      <Form.Text type="invalid" className="text-danger">
                        {errors.inputEmail}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="validationTextarea">
                      <Form.Control
                        as="textarea"
                        placeholder="Message"
                        name="validationTextarea"
                        value={formValues.validationTextarea}
                        onChange={handleChange}
                        style={{ height: '250px' }}
                        isInvalid={errors.validationTextarea}
                      />
                      <Form.Label className="form-label visually-hidden">
                        Message
                      </Form.Label>
                      <Form.Text type="invalid" className="text-danger">
                        {errors.validationTextarea}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col>
                    <div className="d-flex">
                      <Button
                        variant="success"
                        className="rounded-pill"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Appointment;
