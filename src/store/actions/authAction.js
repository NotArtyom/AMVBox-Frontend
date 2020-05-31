import { history } from '../../helpers/history';
import consts from '../../helpers/consts';

export const signIn = ({login, pass}) => (dispatch) => {

  dispatch({
    type: consts.RequestedCredentials
  });

  console.log(login, pass);

  fetch('http://localhost/signIn', {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({email: login, password: pass, type: 'web'})
  })
    .then(data => {  return data.json();})
    .then((data) => {
      console.log(data);
      localStorage.setItem('token', data.token);
      history.push('/');
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
