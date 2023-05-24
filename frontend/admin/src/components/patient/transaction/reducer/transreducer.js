const initialState = {
  transdata: [],
};

export const transReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANS_DATA':
      return {
        ...state,
        transdata: action.payload,
      };
    default:
      return state;
  }
};
