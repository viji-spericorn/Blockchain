import { setErrorMessage } from '../../../../actions';
import { getdata } from '../../../../api/services';

export const listtransaction = () => async (dispatch) => {
  const { data } = await getdata('/transaction');
  if (data.isError === false) {
    dispatch({
      type: 'ALL_DATA',
      payload: data.trans,
    });
  } else {
    dispatch(setErrorMessage(`${data.message}`));
  }
};
