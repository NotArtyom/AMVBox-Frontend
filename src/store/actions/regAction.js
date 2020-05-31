import { history } from '../../helpers/history';
import consts from '../../helpers/consts';

export const signUp = ({login, pass, name, surname}) => (dispatch) => {

  dispatch({
    type: consts.RequestedRegCredentials
  });
  console.log(login, pass, name, surname);
  fetch('http://localhost/signUp', {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({
      email: login,
      name: name,
      surname: surname,
      password: pass,
    })

  })
    .then(data => { return data.json();})
    .then((data) => {
      console.log(data);
      history.push('/confirm');
      dispatch({
        type: consts.ReceivedRegCredentials,
        payload: data
      });
    }).catch(err => {
    dispatch({
      type: consts.RejectedRegCredentials,
      payload: err
    });
  });
};
