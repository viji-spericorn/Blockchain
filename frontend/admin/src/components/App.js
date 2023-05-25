import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { resetErrorMessage, resetSuccessMessage } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import PrivateRoute from '../privateRoute/privateRoute';
import './css/commonstyle.css';
import Dashboard from './Dashboard/Dashboard';
import ProfilePage from './patient/profile';
import MainPage from './Admin/MainPage';
import Listcontact from './Admin/contactus/Listcontact';
import DetailList from './Admin/contactus/ViewContact';
import ListConsult from './patient/consultation/ListConsult';
import FormConsult from './patient/consultation/FormConsult';
import ListPayment from './patient/transaction/Allpayment';
import Listvaccine from './patient/Vaccination/ListVaccine';
import VaccineForm from './patient/Vaccination/VaccineForm';
import List from './Admin/consultation/ConsultationAdmin';
import ListVaccine from './Admin/VaccinationAdmin/Vaccinationadmin';
import ViewPage from './Admin/Transaction/ViewPage';
import ProfilePages from './Admin/Profile';
import Lists from './Admin/patientsManagement/ListUser';

// toaster
const toastConfig = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

const App = () => {
  const dispatch = useDispatch();

  const { successMessage, errorMessage } = useSelector(
    (state) => state.CommonReducers
  );
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, toastConfig);
      dispatch(resetSuccessMessage());
    } else if (errorMessage) {
      toast.error(errorMessage, toastConfig);
      dispatch(resetErrorMessage());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="common">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>

        <Route
          path="/patient/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/enquiry"
          element={
            <PrivateRoute>
              <Listcontact />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/enquiry/:id"
          element={
            <PrivateRoute>
              <DetailList />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/consultation"
          element={
            <PrivateRoute>
              <ListConsult />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/consultations"
          element={
            <PrivateRoute>
              <List />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/consultation/form"
          element={
            <PrivateRoute>
              <FormConsult />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <ListPayment />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/vaccinations"
          element={
            <PrivateRoute>
              <Listvaccine />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/alltransactions"
          element={
            <PrivateRoute>
              <ViewPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/vaccination"
          element={
            <PrivateRoute>
              <ListVaccine />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/patientdetails"
          element={
            <PrivateRoute>
              <Lists />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/profiledata"
          element={
            <PrivateRoute>
              <ProfilePages />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/vaccination/form"
          element={
            <PrivateRoute>
              <VaccineForm />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
