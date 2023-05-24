import { setErrorMessage, setSuccessMessage } from '../../../../actions';
import {
  editdata,
  getdata,
  getDatas,
  postdata,
} from '../../../../api/services';

// list vaccine
export const listvaccine = () => async (dispatch) => {
  const { data } = await getdata('/vaccines');
  try {
    if (data.isError === false) {
      dispatch({
        type: 'GET_VACCINE',
        payload: data.vaccineList,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

//Add vaccination

export const createvaccination = (formData, navigate) => async (dispatch) => {
  const { data } = await postdata('/vaccinationcreate', formData);
  try {
    if (data.isError === false) {
      dispatch(setSuccessMessage(`${data.message}`));
      navigate('/vaccinations');
    } else {
      dispatch(setErrorMessage(`${data.message}`));
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

// list vaccinations details
export const listvaccination = () => async (dispatch) => {
  const { data } = await getdata('/vaccinations');
  try {
    if (data.isError === false) {
      dispatch({
        type: 'VACCINE_DATA',
        payload: data.vaccinedata,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

//List DATE
export const timeList = (datas) => async (dispatch) => {
  const { data } = await getDatas('/getdate', datas);
  try {
    if (data.isError === false) {
      dispatch({
        type: 'GET_TIME',
        payload: data.times,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

//cancel vaccination
export const cancelvaccination = (id, datas) => async (dispatch) => {
  const { data } = await editdata('/vaccinationcancel', id, datas);
  try {
    if (data.isError === false) {
      dispatch(listvaccination());
      dispatch({
        type: 'UPDATE_VACCINE',
        payload: data.updatevaccine,
      });

      dispatch(setSuccessMessage(`${data.message}`));
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};
