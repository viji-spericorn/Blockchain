import { setErrorMessage, setSuccessMessage } from '../../../../actions';
import { postdata } from '../../../../api/services';

//post vaccine certificate
export const vaccineCertificate = (datas, navigate) => async (dispatch) => {
  let { data } = await postdata('/vaccine/certificate', datas);
  console.log('data', data);
  try {
    if (data.isError === false) {
      console.log('setvaccineCertificate', data);
      dispatch(setSuccessMessage(`${data.message}`));
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};
