const initialState = {
  consult: [],
  consultbyid: [],
};

export const consultationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_DATA':
      return {
        ...state,
        consult: action.payload,
      };

    default:
      return state;
  }
};
