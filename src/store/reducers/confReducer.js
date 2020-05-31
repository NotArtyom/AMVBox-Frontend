import consts from '../../helpers/consts';

const initState = {
  fetching: false,
  fetched: false
};

const confReducer = (state = initState, action) => {
  switch (action.type) {
    case consts.RequestedPostCode: {
      return {...state, fetching: true};
    }
    case consts.ReceivedPostCode: {
      return {
        ...state,
        fetching: false,
        fetched: true,
      };
    }
    case consts.RejectedPostCode: {
      return {
        ...state,
        fetching: false,
        fetched: false,
      };
    }
  }
  return state;

};
export default confReducer;