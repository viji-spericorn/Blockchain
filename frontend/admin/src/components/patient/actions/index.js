import {
  loaderFalse,
  loaderTrue,
  setErrorMessage,
  setSuccessMessage,
} from '../../../actions';
import { getdata, postdata, editdata } from '../../../api/services';

//list basic information

export const basicinfo = () => async (dispatch) => {
  const { data } = await getdata('/patient/profile');
  try {
    if (data.isError === false) {
      dispatch({
        type: 'BASIC_DATA',
        payload: data.profiledata,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

//add health information
export const healthinfo = (datas, navigate) => async (dispatch) => {
  console.log('datas', datas);
  const { data } = await postdata('/patient/healthdetails', datas);
  try {
    if (data.isError === false) {
      dispatch(setSuccessMessage(`${data.message}`));
      navigate('/profile');
    } else {
      dispatch(setErrorMessage(`${data.message}`));
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

//list health information

export const listhealthinfo = () => async (dispatch) => {
  const { data } = await getdata('/patient/healthdetails');
  try {
    if (data.isError === false) {
      dispatch({
        type: 'HEALTH_DATA',
        payload: data.health,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

//list health information

export const listdiseaseinfo = () => async (dispatch) => {
  const { data } = await getdata('/patient/diseasedetails');
  try {
    if (data.isError === false) {
      dispatch({
        type: 'DISEASE_DATA',
        payload: data.diseases,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

//add disease information
export const diseaseinfo = (datas, navigate) => async (dispatch) => {
  console.log('datas', datas);
  const { data } = await postdata('/patient/diseasedetails', datas);
  console.log('data', data);
  try {
    if (data.isError === false) {
      navigate('/profile');
      dispatch(listdiseaseinfo());
      dispatch(setSuccessMessage(`${data.message}`));
    } else {
      dispatch(setErrorMessage(`${data.message}`));
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

// list diseaseNames
export const listdiseaseName = () => async (dispatch) => {
  const { data } = await getdata('/alldiseases');
  console.log('data', data);
  try {
    if (data.isError === false) {
      dispatch({
        type: 'DISEASE_LIST',
        payload: data.diseaseNames,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

//update health info
export const updateHealthInfo = (datas) => async (dispatch) => {
  console.log('datas,id', datas);
  const { data } = await editdata('/healthinfoupdate', datas.id, datas);
  try {
    if (data.isError === false) {
      dispatch({
        type: 'UPDATE_HEALTH',
        payload: data.updatehealth,
      });
      dispatch(listhealthinfo());
      dispatch(setSuccessMessage(`${data.message}`));
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

//update personal info
export const updatebasicInfo = (datas) => async (dispatch) => {
  console.log('datas,id', datas);
  const { data } = await editdata('/profileupdate', datas.id, datas);
  try {
    if (data.isError === false) {
      dispatch({
        type: 'UPDATE_BASIC',
        payload: data.updatebasic,
      });
      dispatch(basicinfo());
      dispatch(setSuccessMessage(`${data.message}`));
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};
