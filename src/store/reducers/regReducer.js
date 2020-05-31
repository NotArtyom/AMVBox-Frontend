import  consts from '../../helpers/consts'

const initState = {
  fetching: false,
  fetched: false
};

const regReducer = (state = initState, action) => {
  switch (action.type) {
    case consts.RequestedRegCredentials: {
      return {...state, fetching: true};
    }
    case consts.ReceivedRegCredentials: {
      return {
        ...state,
        fetching: false,
        fetched: true,
      };
    }
    case consts.RejectedRegCredentials: {
      return {
        ...state,
        fetching: false,
        fetched: false,
      };
    }
  }
  return state;
};
export default regReducer;