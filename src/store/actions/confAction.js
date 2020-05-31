import { history } from '../../helpers/history';
import consts from '../../helpers/consts';

export const confMe = ({token}) => (dispatch) => {

  dispatch({
    type: consts.RequestedCredentials
  });
  console.log(token);
  fetch('http://localhost/confirm', {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({code: token,  type: 'web'})
  })
    .then(data => {  return data.json();})
    .then((data) => {
      console.log(data);
      localStorage.setItem('token', data.token);
      setTimeout(() => {
        history.push('/')
      }, 2000);
      dispatch({
        type: consts.ReceivedCredentials,
        payload: data
      });
    }).catch(err => {
    dispatch({
      type: consts.RejectedCredentials,
      payload: err
    });
  });
};
