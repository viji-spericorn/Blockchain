// common actions

import { postdata } from '../api/service';

// toaster for success messsage
export const setSuccessMessage = (data) => (dispatch) => {
  dispatch({
    type: 'SUCCESS_MESSAGE',
    payload: data,
  });
};

// toaster for error message
export const setErrorMessage = (data) => (dispatch) => {
  dispatch({
    type: 'ERROR_MESSAGE',
    payload: data,
  });
};

// reset  success message toaster
export const resetSuccessMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_SUCCESS_MESSAGE',
  });
};

// reset error message toaster
export const resetErrorMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_ERROR_MESSAGE',
  });
};

//submit enquiry

export const submitenquiry = (datas) => async (dispatch) => {
  const { data } = await postdata('/enquiry', datas);
  if (data.isError === false) {
    dispatch(setSuccessMessage(`${data.message}`));
  }
};
