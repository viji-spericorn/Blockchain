import { setErrorMessage, setSuccessMessage } from '../../../../actions';
import { getdataById, postdata } from '../../../../api/services';

// // get by id
// export const getconsultByID = (id) => async (dispatch) => {
//   let { data } = await getdataById('/consultation', id);
//   try {
//     if (data.isError === false) {
//       dispatch({
//         type: 'CONSULTATION_BY_ID',
//         payload: data.data,
//       });
//     }
//   } catch (error) {
//     dispatch(setErrorMessage(`${data.message}`));
//   }
// };

//post certificate consultation
export const consultationCertificate =
  (formData, navigate) => async (dispatch) => {
    let { data } = await postdata('/consultation/certificate', formData);
    try {
      if (data.isError === false) {
        console.log('setconsultationCertificate', data);
        dispatch(setSuccessMessage(`${data.message}`));
      }
    } catch {
      dispatch(setErrorMessage(`${data.message}`));
    }
  };
