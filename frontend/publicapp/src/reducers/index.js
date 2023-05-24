import { combineReducers } from 'redux';

const initialstate = {
  errorMessage: null,
  successMessage: null,
  enquiry: [],
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
    case 'GET_ENQUIRY':
      return {
        ...state,
        enquiry: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  CommonReducers,
});
