import {
  loaderFalse,
  loaderTrue,
  setErrorMessage,
  setSuccessMessage,
} from '../../../actions/index';
import { getdata, postdata } from '../../../api/services';

//patient signup
export const signUp = (datas, navigate) => async (dispatch) => {
  try {
    dispatch(loaderTrue());
    let { data } = await postdata('/auth/signup', datas);
    if (data.isError === false) {
      dispatch(setSuccessMessage(`${data.message}`));
      dispatch(loaderFalse());
      navigate('/');
    } else {
      dispatch(setErrorMessage(`${data.message}`));
    }
  } catch (error) {
    dispatch(setErrorMessage(error.message));
  }
};

//setting login all

export const loginall = (datas, navigate) => async (dispatch) => {
  let { data } = await postdata('/auth', datas);
  if (data.isError === false) {
    localStorage.setItem('accessToken', data?.accessToken);
    localStorage.setItem('role', data?.role);
    dispatch({
      type: 'LOGIN_DATA',
      payload: data.role,
    });
    if (data.role === 'patient') {
      dispatch(setSuccessMessage(`${data.message}`));
      navigate('/patient/dashboard');
    } else if (data.role === 'admin') {
      dispatch(setSuccessMessage(`${data.message}`));
      navigate('/dashboard');
    }
  } else {
    dispatch(setErrorMessage(`${data?.message}`));
    navigate('/');
  }
};

//Logout
export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('role');
  console.log(navigate);
  dispatch({
    type: 'LOG_OUT',
    payload: null,
  });
  navigate();
};

//LIST ADMIN

export const basicinfos = () => async (dispatch) => {
  const { data } = await getdata('/profiles');
  try {
    if (data.isError === false) {
      dispatch({
        type: 'ADMIN_DATA',
        payload: data.profiledata,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};
