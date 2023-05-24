import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './auth.css';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from './action';

// signup form

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [uniqueIdentificationId, setUniqueIdentificationId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  //setting validation

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!uniqueIdentificationId.trim()) {
      errors.uniqueIdentificationId = 'Unique Identification ID is required';
    } else if (
      !/^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/.test(
        uniqueIdentificationId
      )
    ) {
      errors.uniqueIdentificationId = 'Invalid format';
    }

    if (!phone.trim()) {
      errors.phone = 'Phone is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (!dob.trim()) {
      errors.dob = 'Date of birth is required';
    } else if (new Date() < new Date(dob)) {
      errors.dob = 'Invalid date of birth';
    }

    if (!address.trim()) {
      errors.address = 'Address is required';
    }

    if (!pincode.trim()) {
      errors.pincode = 'PIN code is required';
    } else if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      errors.pincode = 'Invalid PIN code';
    }

    if (!country.trim()) {
      errors.country = 'Country is required';
    }

    if (!state.trim()) {
      errors.state = 'State is required';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    } else {
      const datas = {
        name,
        uniqueIdentificationId,
        phone,
        email,
        dob,
        address,
        pincode,
        country,
        state,
        password,
        confirmPassword,
      };
      console.log('datas', datas);
      dispatch(signUp(datas, navigate));
    }
    // Submit form data to backend API or handle validation and state changes
  };

  return (
    <div>
      <div className="m-6">
        <Container className="d-flex shadow rounded m-8 p-3">
          <Form
            onSubmit={handleSubmit}
            className="w-100 border-4 border-black p-5 text-black"
          >
            <h4 className="text-center  m-3 ">SIGNUP</h4>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formName" className="mt-2">
                  <Form.Label className="mt-3 mb-1 text-black">
                    Name:
                  </Form.Label>
                  <Form.Control
                    className="text-black"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <Form.Text className="error text-danger">
                      {errors.name}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="formUniqueId" className="mt-2">
                  <Form.Label className="mt-3 mb-1 text-black">
                    Unique Identification ID:
                  </Form.Label>
                  <Form.Control
                    className="text-black"
                    type="text"
                    placeholder="Enter your AadharNumber"
                    value={uniqueIdentificationId}
                    onChange={(e) => setUniqueIdentificationId(e.target.value)}
                  />
                  {errors.uniqueIdentificationId && (
                    <Form.Text className="error text-danger">
                      {errors.uniqueIdentificationId}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="formPhone" className="mt-2">
                  <Form.Label className="mt-3 mb-1 text-black">
                    Phone:
                  </Form.Label>
                  <Form.Control
                    className="text-black"
                    type="text"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && (
                    <Form.Text className="error text-danger">
                      {errors.phone}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="formEmail" className="mt-2">
                  <Form.Label className="mt-3 mb-1 text-black">
                    Email:
                  </Form.Label>
                  <Form.Control
                    className="text-black"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <Form.Text className="error text-danger">
                      {errors.email}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="formDob" className="mt-2">
                  <Form.Label className="mt-3 mb-1 text-black">
                    Date of Birth:
                  </Form.Label>
                  <Form.Control
                    className="text-black"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                  {errors.dob && (
                    <Form.Text className="error text-danger">
                      {errors.dob}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="formAddress" className="mt-2">
                  <Form.Label className="mt-3 mb-1 text-black">
                    Address:
                  </Form.Label>
                  <Form.Control
                    className="text-black"
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errors.address && (
                    <Form.Text className="error text-danger">
                      {errors.address}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPincode" className="mt-2">
                  <Form.Label className="mt-3 mb-1 text-black">
                    PIN code:
                  </Form.Label>
                  <Form.Control
                    className="text-black"
                    type="text"
                    placeholder="Enter your PIN code"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  {errors.pincode && (
                    <Form.Text className="error text-danger">
                      {errors.pincode}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="formState" className="mt-2">
                  <Form.Label className="mt-3 mb-1 text-black">
                    State:
                  </Form.Label>
                  <Form.Control
                    className="text-black"
                    type="text"
                    placeholder="Enter your state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                  {errors.state && (
                    <Form.Text className="error text-danger">
                      {errors.state}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="formCountry" className="mt-2">
                  <Form.Label className="mt-3 mb-1 text-black">
                    Country:
                  </Form.Label>
                  <Form.Control
                    className="text-black"
                    type="text"
                    placeholder="Enter your country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  {errors.country && (
                    <Form.Text className="error text-danger">
                      {errors.country}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-2">
                  <Form.Label className="mt-3 mb-1 text-black">
                    Password:
                  </Form.Label>
                  <Form.Control
                    className="text-black"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <Form.Text className="error text-danger">
                      {errors.password}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="formConfirmPassword" className="mt-2">
                  <Form.Label className="mt-3 mb-1 text-black">
                    Confirm Password:
                  </Form.Label>
                  <Form.Control
                    className="text-black"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPassword && (
                    <Form.Text className="error text-danger">
                      {errors.confirmPassword}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" className="mt-3 m-2 mb-1">
              Submit
            </Button>
            <Button
              as={Link}
              to="http://localhost:3000/"
              className="mt-3 m-2 mb-1"
            >
              Back
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default Signup;
