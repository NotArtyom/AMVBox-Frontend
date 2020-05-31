import { history } from '../../helpers/history';
import consts from '../../helpers/consts';

export const profile  = (dispatch) => {
  dispatch({
    type: consts.RequestedProfile
  });
  fetch('http://localhost/self', {
    method: 'GET', headers: {
      'Content-Type': 'application/json',
      'Authorization' : localStorage.getItem('token')
    },
  })
    .then(data => {  return data.json();})
    .then((data) => {
      console.log(data);
      dispatch({
        type: consts.ReceivedProfile,
        payload: data
      });
    }).catch(err => {
    dispatch({
      type: consts.RejectedProfile,
      payload: err
    });
  });
};
