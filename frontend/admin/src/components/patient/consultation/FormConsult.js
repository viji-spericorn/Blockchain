import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Web3 from 'web3';
import moment from 'moment';
import Navbar from '../../Dashboard/Navbar';
import Sidebar from '../../Dashboard/Sidebar';
import {
  departmentList,
  hospitalList,
  createconsultation,
  doctorsList,
  timeList,
} from './actions';

const FormConsult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timeset, setTimeset] = useState();

  const { doctors, departments, hospitals, time } = useSelector(
    (state) => state.consultReducers
  );

  useEffect(() => {
    dispatch(departmentList());
  }, []);
  useEffect(() => {
    dispatch(hospitalList());
  }, []);

  const formik = useFormik({
    initialValues: {
      hospital: '',
      department: '',
      doctor: '',
      date: '',
      time: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      hospital: Yup.string().required('hospital is required'),
      department: Yup.string().required('department is required'),
      doctor: Yup.string().required('doctor is required'),
      date: Yup.string().required('Date is required'),
      time: Yup.string().required('Time is required'),
    }),

    onSubmit: async (values) => {
      try {
        //
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const netVer = await web3.eth.net.getId();
        localStorage.setItem('walletAddress', accounts[0]);
        // const wrapper = await wrappedTokenDeposit({
        //   web3,
        //   address: accounts[0],
        //   netVer,
        // });
        const tokenAddress = '0x18673264427402acf57E7AE218403d3f60daba0c';
        const toWei = async (web3, amount, decimals) => {
          return await web3.utils.toWei(
            parseFloat(amount).toFixed(decimals).toString(),
            'ether'
          );
        };
        const getGasPrice = async (web3) => {
          const gasPrice = await web3.eth.getGasPrice();
          return web3.utils.toBN(gasPrice).add(web3.utils.toBN('20000000000'));
        };
        const AmountInWei = await toWei(web3, 0.001, 18);
        const GetGasPricesss = await getGasPrice(web3);
        const result = await web3.eth.sendTransaction({
          from: accounts[0],
          to: tokenAddress,
          value: AmountInWei,
          GetGasPricesss,
        });
        if (result) {
          const finalvalues = {
            ...values,
            transactionHash: result.transactionHash,
          };
          dispatch(createconsultation(finalvalues, navigate));
        } else {
          console.log('error');
        }
        // Handle success case
      } catch (error) {
        // Handle error case
        console.log('error', error);
      }
    },
  });

  useEffect(() => {
    if (formik.values.hospital && formik.values.department) {
      const { hospitalId } = hospitals?.find(
        (eachHospital) => eachHospital.id === formik.values.hospital
      );

      const { departmentId } = departments.find(
        (eachdept) => eachdept.id === formik.values.department
      );

      // console.log(hId, dId);
      dispatch(doctorsList({ hospitalId, departmentId }));
    }
  }, [formik.values.hospital, formik.values.department]);

  useEffect(() => {
    if (formik.values.doctor) {
      console.log(formik.values.doctor);
      const doctorId = doctors?.find(
        (eachDoctor) => eachDoctor.id === formik.values.doctor
      );

      dispatch(timeList({ doctorId: doctorId.id, date: formik.values.date }));
    }
    generateTimeSlots(formik.values.date);
  }, [formik.values.date, formik.values.doctor]);

  useEffect(() => {
    if (time) {
      const timer = timeset?.filter(
        (eachTime) => !time?.some((e) => e.time === eachTime)
      );

      setTimeset(timer);
    }
    // generateTimeSlots();
  }, [time]);

  const generateTimeSlots = (date) => {
    const currentTime = moment();
    const eveningTime = moment()
      .endOf('day')
      .set({ hour: 17, minute: 0, second: 0 });
    const timeSlots = [];

    const selectedDate = moment(date);
    const isToday = selectedDate.isSame(currentTime, 'day');

    if (isToday) {
      currentTime.startOf('hour').add(1, 'hour'); // Start from the next hour
    } else {
      currentTime.set({ hour: 10, minute: 0, second: 0 });
    }

    while (currentTime.isBefore(eveningTime)) {
      const formattedTime = currentTime.format('hh:mmA');
      if (formattedTime !== '01:00PM') {
        timeSlots.push(formattedTime);
      }
      currentTime.add(1, 'hour').startOf('hour');
    }

    setTimeset(timeSlots);
    return timeSlots;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'hospital') {
      const filteredHospital = hospitals.find(
        (hospital) => hospital.id === value
      );
      formik.setFieldValue('hospital', value);

      if (filteredHospital) {
        const filteredHospitalId = filteredHospital.hospitalId;
      } else {
        console.log('filteredHospitalId', null);
      }
    } else if (name === 'department') {
      const filteredDepartment = departments.find(
        (department) => department.id === value
      );
      formik.setFieldValue('department', value);

      if (filteredDepartment) {
        const filteredDepartmentId = filteredDepartment.departmentId;
      } else {
        console.log('filteredDepartmentId', null);
      }
    } else {
      formik.setFieldValue('doctor', value);
    }
  };

  return (
    <React.Fragment>
      <div className="dashboard d-flex">
        <div>
          <Sidebar />
        </div>
        <div
          style={{
            flex: '1 1 auto',
            display: 'flex',
            flexFlow: 'column',
            height: '100vh',
            overflowY: 'scroll',
          }}
        >
          <Navbar />
          <div className="container mb-6 headd">
            <div
              style={{
                maxWidth: '600px',
                margin: '0 auto',
                marginTop: '5rem',
              }}
            >
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/online-doctor-consultation-4619991-3833045.png"
                className="w-100"
                style={{ maxHeight: '250px' }}
                alt="truck reg"
              />

              <h3 style={{ textAlign: 'center', margin: '2rem 0' }}>
                Consultation
              </h3>
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col>
                    <div className="mb-3">
                      <Form.Label
                        className="form-label"
                        htmlFor="hospital"
                        style={{ color: '#283779', fontSize: '20px' }}
                      >
                        Hospital Name:
                      </Form.Label>
                      <Form.Control
                        as="select"
                        id="hospital"
                        name="hospital"
                        value={formik.values.hospital}
                        onChange={handleChange}
                      >
                        <option value="">Select hospital</option>

                        {hospitals?.map((hospitalDatas) => {
                          return (
                            <option
                              key={hospitalDatas?.id}
                              value={hospitalDatas?.id}
                            >
                              {hospitalDatas?.name}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </div>
                    {formik.touched.hospital && formik.errors.hospital ? (
                      <div className="text-danger">
                        {formik.errors.hospital}
                      </div>
                    ) : null}
                  </Col>
                  <Col>
                    <div className="mb-3">
                      <Form.Label
                        className="form-label"
                        htmlFor="department"
                        style={{ color: '#283779', fontSize: '20px' }}
                      >
                        Department:
                      </Form.Label>
                      <Form.Control
                        as="select"
                        id="department"
                        name="department"
                        value={formik.values.department}
                        onChange={formik.handleChange}
                      >
                        <option value="">Select department</option>
                        {departments?.map((departmentDatas, index) => {
                          return (
                            <option key={index} value={departmentDatas?.id}>
                              {departmentDatas?.name}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </div>
                    {formik.touched.department && formik.errors.department ? (
                      <div className="text-danger">
                        {formik.errors.department}
                      </div>
                    ) : null}
                  </Col>
                </Row>

                <div className="mb-3">
                  <Form.Label
                    className="form-label"
                    htmlFor="doctor"
                    style={{ color: '#283779', fontSize: '20px' }}
                  >
                    Doctor:
                  </Form.Label>
                  <Form.Control
                    as="select"
                    id="doctor"
                    name="doctor"
                    value={formik.values.doctor}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select doctor</option>
                    {doctors?.map((doctorDatas, index) => {
                      return (
                        <option key={index} value={doctorDatas?.id}>
                          {doctorDatas?.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </div>
                {formik.touched.doctor && formik.errors.doctor ? (
                  <div className="text-danger">{formik.errors.doctor}</div>
                ) : null}
                <div className="mb-3">
                  <Form.Label
                    className="form-label"
                    htmlFor="date"
                    style={{ color: '#283779', fontSize: '20px' }}
                  >
                    Date of Consultation
                  </Form.Label>
                  <Form.Control
                    type="date"
                    id="date"
                    name="date"
                    min={new Date().toISOString()?.split('T')[0]}
                    value={formik.values.date}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.touched.date && formik.errors.date ? (
                  <div className="text-danger">{formik.errors.date}</div>
                ) : null}
                <div className="mb-3">
                  <Form.Label
                    className="form-label"
                    htmlFor="time"
                    style={{ color: '#283779', fontSize: '20px' }}
                  >
                    Time for consultation:
                  </Form.Label>
                  <Form.Control
                    as="select"
                    id="time"
                    name="time"
                    value={formik.values.time}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select time</option>
                    {timeset?.map((e, index) => {
                      return (
                        <option key={index} value={e}>
                          {e}
                        </option>
                      );
                    })}
                  </Form.Control>
                </div>
                {formik.touched.time && formik.errors.time ? (
                  <div className="text-danger">{formik.errors.time}</div>
                ) : null}
                <Button variant="primary" type="submit" className="m-1">
                  Book Now
                </Button>
                <Button
                  variant="danger"
                  className="m-1"
                  as={Link}
                  to="/consultation"
                >
                  Cancel
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FormConsult;
