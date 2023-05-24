const initialstate = {
  contactusall: [],
  contactus: [],
};

export const contactReducers = (state = initialstate, action) => {
  switch (action.type) {
    case 'GET_REVIEWS':
      return {
        ...state,
        contactusall: action.payload,
      };
    case 'REVIEW_DATA':
      return {
        ...state,
        contactus: action.payload,
      };
    default:
      return state;
  }
};
