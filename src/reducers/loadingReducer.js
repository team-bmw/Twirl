// ACTION CONSTANTS
const START_LOADING = 'START_LOADING';
const END_LOADING = 'END_LOADING';

// ACTION CREATORS
export const startLoading = target => {
  return {
    type: START_LOADING,
    target,
  };
};

export const endLoading = target => {
  return {
    type: END_LOADING,
    target,
  };
};

// INITIAL STATE
const initialState = {
  wordcloudIsLoading: false,
  tweetIsLoading: false,
};

// REDUCER
export const loading = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING: {
      return { ...state, [action.target]: true };
    }
    case END_LOADING: {
      return { ...state, [action.target]: false };
    }
    default:
      return state;
  }
};
