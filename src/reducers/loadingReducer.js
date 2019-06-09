// ACTION CONSTANTS
const START_LOADING = 'START_LOADING';
const END_LOADING = 'END_LOADING';

// ACTION CREATORS
export const startLoading = () => {
  return {
    type: START_LOADING,
  };
};

export const endLoading = () => {
  return {
    type: END_LOADING,
  };
};

// INITIAL STATE
const initialState = false;

// REDUCER
export const isLoading = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case END_LOADING:
      return false;
    default:
      return state;
  }
};
