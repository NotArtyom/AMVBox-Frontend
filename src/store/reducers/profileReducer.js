import consts from '../../helpers/consts';

const initState = {
  profile: {},
  fetching: false,
  fetched: false
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case consts.RequestedProfile: {
      return {...state, fetching: true};
    }
    case consts.ReceivedProfile: {
      return {
        ...state,
        profile: action.payload,
        fetching: false,
        fetched: true,
      };
    }
    case consts.RejectedProfile: {
      return {
        ...state,
        fetching: false,
        fetched: false,
      };
    }
  }
  return state;

};
export default profileReducer;
