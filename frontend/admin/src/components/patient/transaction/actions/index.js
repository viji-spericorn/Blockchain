import { setErrorMessage } from '../../../../actions';
import { getdata } from '../../../../api/services';

// list all transaction
export const listtransaction = () => async (dispatch) => {
  const { data } = await getdata('/transactiondetails');
  try {
    if (data.isError === false) {
      dispatch({
        type: 'TRANS_DATA',
        payload: data.trans,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};
