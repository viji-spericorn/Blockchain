const initialState = {
  consultdata: [],
  departments: [],
  hospitals: [],
  doctors: [],
  time: [],
};

export const consultReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'CONSULT_DATA':
      return {
        ...state,
        consultdata: action.payload,
      };
    case 'GET_HOSPITAL':
      return {
        ...state,
        hospitals: action.payload,
      };
    case 'GET_DEPARTMENT':
      return {
        ...state,
        departments: action.payload,
      };
    case 'GET_DOCTORS':
      return {
        ...state,
        doctors: action.payload,
      };
    case 'GET_TIME':
      return {
        ...state,
        time: action.payload,
      };
    case 'UPDATE_CONSULT':
      return {
        ...state,
        consultdata: action.payload,
      };

    default:
      return state;
  }
};
