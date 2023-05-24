const initialState = {
  logindata: localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null,
  role: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_DATA':
      return {
        ...state,
        logindata: localStorage.getItem('accessToken'),
        role: action.payload,
      };
    case 'LOG_OUT':
      return {
        ...state,
        logindata: action.payload,
      };
    case 'ADMIN_DATA':
      return {
        ...state,
        basicdata: action.payload,
      };

    default:
      return state;
  }
};
