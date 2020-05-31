import  consts from '../../helpers/consts'

const initState = {
  fetching: false,
  fetched: false
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case consts.RequestedCredentials: {
      return {...state, fetching: true};
    }
    case consts.ReceivedCredentials: {
      return {
        ...state,
        fetching: false,
        fetched: true,
      };
    }
    case consts.RejectedCredentials: {
      return {
        ...state,
        fetching: false,
        fetched: false,
      };
    }
  }
  return state;

};
export default authReducer;