const initialState = {
  transaction: [],
};

export const transcationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_DATA':
      return {
        ...state,
        transaction: action.payload,
      };

    default:
      return state;
  }
};
