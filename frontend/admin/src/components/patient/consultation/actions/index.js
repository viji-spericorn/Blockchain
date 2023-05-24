import {
  getdata,
  postdata,
  getDatas,
  editdata,
  getdataById,
} from '../../../../api/services';
import { setErrorMessage, setSuccessMessage } from '../../../../actions';

//Add Consultation

export const createconsultation = (formData, navigate) => async (dispatch) => {
  const { data } = await postdata('/consultation/add', formData);
  try {
    if (data.isError === false) {
      dispatch(setSuccessMessage(`${data.message}`));
      navigate('/consultation');
    } else {
      dispatch(setErrorMessage(`${data.message}`));
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

//List Hospitals
export const hospitalList = (datas) => async (dispatch) => {
  const { data } = await getdata('/hospital', datas);
  try {
    if (data.isError === false) {
      dispatch({
        type: 'GET_HOSPITAL',
        payload: data.hospitalList,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};
//List department
export const departmentList = (datas) => async (dispatch) => {
  const { data } = await getdata('/department', datas);
  try {
    if (data.isError === false) {
      dispatch({
        type: 'GET_DEPARTMENT',
        payload: data.departmentList,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};
//List doctors
export const doctorsList = (datas) => async (dispatch) => {
  const { data } = await getDatas('/doctor', datas);
  try {
    if (data.isError === false) {
      dispatch({
        type: 'GET_DOCTORS',
        payload: data.doctorsList,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

//List doctors
export const timeList = (datas) => async (dispatch) => {
  const { data } = await getDatas('/gettime', datas);
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

// list consultations

export const listconsult = () => async (dispatch) => {
  const { data } = await getdata('/consultations');
  try {
    if (data.isError === false) {
      dispatch({
        type: 'CONSULT_DATA',
        payload: data.consultdata,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

// update consultation
export const cancelconsultation = (id, datas) => async (dispatch) => {
  const { data } = await editdata('/cancellation', id, datas);
  try {
    if (data.isError === false) {
      dispatch({
        type: 'UPDATE_CONSULT',
        payload: data.updateconsult,
      });
      dispatch(listconsult());
      dispatch(setSuccessMessage(`${data.message}`));
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};
