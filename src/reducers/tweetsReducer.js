// ACTION CONSTANTS
const UPDATE_SELECTED_TWEETS = 'UPDATE_SELECTED_TWEETS';
const EMPTY_SELECTED_TWEETS = 'EMPTY_SELECTED_TWEETS';

// ACTION CREATORS
export const updateSelectedTweets = tweetData => ({
  type: UPDATE_SELECTED_TWEETS,
  tweetData,
});

export const emptySelectedTweets = () => ({
  type: EMPTY_SELECTED_TWEETS,
});

// INITIAL STATE
const initialState = {
  selectedTweets: [],
};

// REDUCER
export const tweets = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_TWEETS: {
      return { ...state, selectedTweets: action.tweetData };
    }
    case EMPTY_SELECTED_TWEETS: {
      return { ...state, selectedTweets: [] };
    }
    default:
      return state;
  }
};
