const initialState = {
  vaccine: [],
};

export const vaxReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_DATA':
      return {
        ...state,
        vaccine: action.payload,
      };

    default:
      return state;
  }
};
