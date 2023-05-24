//LIST

import { setErrorMessage } from '../../../../actions';
import { getdata, getdataById } from '../../../../api/services';

export const listContactus = (datas) => async (dispatch) => {
  const { data } = await getdata('/enquiry', datas);
  if (data) {
    dispatch({
      type: 'GET_REVIEWS',
      payload: data.contactlist,
    });
  } else {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

//VIEW
export const getbyidContactus = (id) => async (dispatch) => {
  const { data } = await getdataById('/enquiry', id);
  dispatch({
    type: 'REVIEW_DATA',
    payload: data.Review,
  });
};
