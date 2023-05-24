const initialState = {
  basicdata: [],
  healthdata: [],
  diseasedata: [],
  diseaseNames: [],
};

export const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BASIC_DATA':
      return {
        ...state,
        basicdata: action.payload,
      };
    case 'HEALTH_DATA':
      return {
        ...state,
        healthdata: action.payload,
      };
    case 'DISEASE_DATA':
      return {
        ...state,
        diseasedata: action.payload,
      };
    case 'DISEASE_LIST':
      return {
        ...state,
        diseaseNames: action.payload,
      };
    case 'UPDATE_HEALTH':
      return {
        ...state,
        healthdata: action.payload,
      };

    default:
      return state;
  }
};
