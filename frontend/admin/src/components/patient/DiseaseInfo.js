import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Joi from 'joi';
import { useDispatch, useSelector } from 'react-redux';
import { diseaseinfo, listdiseaseName } from './actions';
import { useNavigate } from 'react-router-dom';

const DiseaseForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listdiseaseName());
  }, []);

  const { diseaseNames } = useSelector((state) => state.patientReducer);
  console.log('diseaseNames', diseaseNames);
  const [formValues, setFormValues] = useState({
    diseaseName: '',
    startDate: '',
    remarks: '',
  });
  const [errors, setErrors] = useState({}); // Updated state variable for errors

  const schema = Joi.object({
    diseaseName: Joi.string().trim().required().label('Disease Name'),
    startDate: Joi.date()
      .required()
      .max(new Date().toISOString().split('T')[0])
      .label('Started Date'),
    remarks: Joi.string().trim().allow('').label('Remarks'),
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
      dispatch(diseaseinfo(formValues, navigate));
      props.setdisplay(false);
      console.log('Form submitted successfully!', formValues);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="m-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="diseaseName">
          <Form.Label>Disease Name</Form.Label>
          <Form.Select
            name="diseaseName"
            value={formValues.diseaseName}
            onChange={handleChange}
            isInvalid={errors.diseaseName}
          >
            <option value="">Select a disease</option>
            {diseaseNames?.map((data) => (
              <option key={data.Id} value={data.name}>
                {data.name}
              </option>
            ))}
          </Form.Select>

          <Form.Text type="invalid" className="text-danger">
            {errors.diseaseName}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>Started Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={formValues.startDate}
            onChange={handleChange}
            isInvalid={errors.startDate} // Set isInvalid prop based on error
          />
          <Form.Text type="invalid" className="text-danger">
            {errors.startDate}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="remarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
            as="textarea"
            name="remarks"
            value={formValues.remarks}
            onChange={handleChange}
            isInvalid={errors.remarks} // Set isInvalid prop based on error
          />
          <Form.Text type="invalid" className="text-danger">
            {errors.remarks}
          </Form.Text>
        </Form.Group>
        <div className="d-flex">
          <Button variant="success" type="submit" className="m-2">
            Save
          </Button>
          <Button
            variant="primary"
            className="m-2"
            onClick={() => props.setdisplay(false)}
          >
            Cancel
          </Button>
        </div>
      </Form>

      <hr />
    </div>
  );
};

export default DiseaseForm;
