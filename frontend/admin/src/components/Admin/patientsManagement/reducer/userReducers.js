const initialState = {
  userdata: [],
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_DATA':
      return {
        ...state,
        userdata: action.payload,
      };

    default:
      return state;
  }
};
