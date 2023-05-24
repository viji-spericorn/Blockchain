import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './HomePage';
import '../css/common.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetErrorMessage, resetSuccessMessage } from '../actions';

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
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
