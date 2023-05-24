import { combineReducers } from 'redux';
import { authReducer } from '../components/Auth/reducer/authReducer';
import { patientReducer } from '../components/patient/reducers/patientReducer';
import { contactReducers } from '../components/Admin/contactus/reducers/contactReducers';
import { consultReducers } from '../components/patient/consultation/reducers.js/consultReducers';
import { vaccineReducers } from '../components/patient/Vaccination/reducer/vaccinereducer';
import { transReducer } from '../components/patient/transaction/reducer/transreducer';
import { consultationReducer } from '../components/Admin/consultation/reducer/consultationReducer';
import { transcationReducer } from '../components/Admin/Transaction/reducer/transReducer';
import { userReducers } from '../components/Admin/patientsManagement/reducer/userReducers';

const initialstate = {
  errorMessage: null,
  successMessage: null,
  loader: false,
};

// setting commom Reducers

const CommonReducers = (state = initialstate, action) => {
  switch (action.type) {
    case 'SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: action.payload,
      };
    case 'ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'RESET_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: null,
      };
    case 'RESET_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: null,
      };
    case 'LOADER_TRUE':
      return {
        ...state,
        loader: true,
      };
    case 'LOADER_FALSE':
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
};

export default combineReducers({
  CommonReducers,
  authReducer,
  patientReducer,
  contactReducers,
  consultReducers,
  vaccineReducers,
  transReducer,
  consultationReducer,
  transcationReducer,
  userReducers,
});
