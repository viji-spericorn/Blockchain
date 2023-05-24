import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../Auth/auth.css';
import { useNavigate } from 'react-router-dom';
import { basicinfo, updatebasicInfo } from './actions';

// edit basicinfo form

const BasicInfo = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(basicinfo());
  }, []);

  const { basicdata } = useSelector((state) => state.patientReducer);
  console.log('basicdata', basicdata);

  const [name, setName] = useState(basicdata.name);
  const [uniqueIdentificationId, setUniqueIdentificationId] = useState(
    basicdata.aadharNumber
  );
  const [phone, setPhone] = useState(basicdata.phoneNumber);
  const [email, setEmail] = useState(basicdata?.login?.email);
  const [dob, setDob] = useState(basicdata.dob);
  const [address, setAddress] = useState(basicdata.address);
  const [pincode, setPincode] = useState(basicdata.pinCode);
  const [country, setCountry] = useState(basicdata.country);
  const [state, setState] = useState(basicdata.state);

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
    } else {
      const phoneRegex = /^[1-9][0-9]{9}$/;
      if (!phone.match(phoneRegex)) {
        errors.phone = 'Phone number is invalid';
      }
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
        id: props.id,
        name,
        uniqueIdentificationId,
        phone,
        email,
        dob,
        address,
        pincode,
        country,
        state,
      };
      console.log('datas', datas);
      dispatch(updatebasicInfo(datas));
      props.setedit(false);
    }
    // Submit form data to backend API or handle validation and state changes
  };

  return (
    <div>
      <h4 className="text-center  m-3 ">Personal Details</h4>
      <div className="m-6">
        <Container className="d-flex shadow rounded m-8 p-3">
          <Form
            onSubmit={handleSubmit}
            className="w-100 border-4 border-black p-5 text-black"
          >
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
                    maxLength={16}
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
                    disabled
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
                    value={
                      dob
                        ? new Date(dob).toISOString().split('T')[0]
                        : basicdata.dob
                    }
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
              </Col>
            </Row>
            <div className="d-flex justify-content-center m-1">
              <Button type="submit" className="mt-3 mb-1">
                Update
              </Button>
              <Button
                variant="secondary"
                className="mt-3 mb-1"
                onClick={() => props.setedit(false)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default BasicInfo;
