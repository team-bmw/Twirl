// ACTION CONSTANTS
const UPDATE_SELECT_TWEETS = 'UPDATE_SELECT_TWEETS';

// ACTION CREATORS
export const updateSelectedTweets = tweetData => {
  return {
    type: UPDATE_SELECT_TWEETS,
    tweetData,
  };
};

// INITIAL STATE
const initialState = {
  selectedTweets: [],
};

// REDUCER
export const tweets = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELECT_TWEETS: {
      return { ...state, selectedTweets: action.tweetData };
    }
    default:
      return state;
  }
};
