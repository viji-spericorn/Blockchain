import { setErrorMessage } from '../../../../actions';
import { getdata } from '../../../../api/services';

export const listuser = () => async (dispatch) => {
  const { data } = await getdata('/patientdetails');
  if (data.isError === false) {
    dispatch({
      type: 'ALL_DATA',
      payload: data.userdata,
    });
  } else {
    dispatch(setErrorMessage(`${data.message}`));
  }
};
