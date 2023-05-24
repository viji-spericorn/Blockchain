import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Joi from 'joi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { healthinfo, listhealthinfo, updateHealthInfo } from './actions';

const schema = Joi.object({
  bloodGroup: Joi.string().required(),
  height: Joi.number().required('must needed'),
  weight: Joi.number().required(),
  gender: Joi.string().valid('male', 'female', 'Other').required(),
});

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const HealthInformation = (props) => {
  console.log('id', props.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listhealthinfo());
  }, []);

  const { healthdata } = useSelector((state) => state.patientReducer);
  const [formValues, setFormValues] = useState({
    bloodGroup: props.id ? healthdata.blood : '',
    height: props.id ? healthdata.height : '',
    weight: props.id ? healthdata.weight : '',
    gender: props.id ? healthdata.gender : '',
  });

  const [errors, setErrors] = useState({});

  console.log('healthdata', healthdata);

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
      if (props.id) {
        const form = { ...formValues, id: props.id };
        dispatch(updateHealthInfo(form));
        props.setedit(false);
        console.log('Form updated successfully!', formValues);
      } else {
        dispatch(healthinfo(formValues, navigate));
        props.setdisplay(false);
        console.log('Form submitted successfully!', formValues);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Form onSubmit={handleSubmit} className="m-3">
      <Form.Group controlId="bloodGroup">
        <Form.Label>Blood Group</Form.Label>
        <Form.Control
          as="select"
          name="bloodGroup"
          value={formValues.bloodGroup}
          onChange={handleChange}
          isInvalid={!!errors.bloodGroup}
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </Form.Control>
        <Form.Text type="invalid" className="text-danger">
          {errors.bloodGroup}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="height">
        <Form.Label>Height</Form.Label>
        <Form.Control
          type="number"
          name="height"
          value={formValues.height}
          onChange={handleChange}
          isInvalid={!!errors.height}
        />
        <Form.Text type="invalid" className="text-danger">
          {errors.height}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="weight">
        <Form.Label>Weight</Form.Label>
        <Form.Control
          type="number"
          name="weight"
          value={formValues.weight}
          onChange={handleChange}
          isInvalid={!!errors.weight}
        />
        <Form.Text type="invalid" className="text-danger">
          {errors.weight}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="gender">
        <Form.Label>Gender</Form.Label>
        <div>
          <Form.Check
            inline
            label="Male"
            type="radio"
            name="gender"
            value="male"
            checked={formValues.gender === 'male'}
            onChange={handleChange}
            isInvalid={!!errors.gender}
          />
          <Form.Check
            inline
            label="Female"
            type="radio"
            name="gender"
            value="female"
            checked={formValues.gender === 'female'}
            onChange={handleChange}
            isInvalid={!!errors.gender}
          />
          <Form.Check
            inline
            label="Other"
            type="radio"
            name="gender"
            value="Other"
            checked={formValues.gender === 'Other'}
            onChange={handleChange}
            isInvalid={!!errors.Other}
          />
        </div>
        <Form.Text type="invalid" className="text-danger">
          {errors.gender}
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" className="m-2">
        {props.id ? 'Update' : 'Save'}
      </Button>
    </Form>
  );
};

export default HealthInformation;
