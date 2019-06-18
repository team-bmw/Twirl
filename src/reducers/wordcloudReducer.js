import axios from 'axios';

// Action types
const WORDCLOUD_DATA_REQUEST = 'WORDCLOUD_DATA_REQUEST';
const WORDCLOUD_DATA_FAILURE = 'WORDCLOUD_DATA_FAILURE';
const WORDCLOUD_DATA_SUCCESS = 'WORDCLOUD_DATA_SUCCESS';
const WORDCLOUD_RESET = 'WORDCLOUD_RESET';
const ADD_WORD = 'ADD_WORD';

// Action creators
const wordcloudDataRequest = () => {
  return {
    type: WORDCLOUD_DATA_REQUEST,
  };
};

const wordcloudDataFailure = () => {
  return {
    type: WORDCLOUD_DATA_FAILURE,
  };
};

export const wordcloudDataSuccess = wordData => {
  return {
    type: WORDCLOUD_DATA_SUCCESS,
    wordData,
  };
};

export const resetWordCloud = () => ({
  type: WORDCLOUD_RESET,
});

export const addWordToWordCloud = word => ({
  type: ADD_WORD,
  word,
});

const initialState = { status: 'initial', wordData: [] };

// Reducer
export const wordcloudData = (state = initialState, action) => {
  switch (action.type) {
    case WORDCLOUD_DATA_REQUEST:
      return { status: 'fetching', wordData: [] };
    case WORDCLOUD_DATA_FAILURE:
      return { status: 'failed', wordData: [] };
    case WORDCLOUD_DATA_SUCCESS:
      return { status: 'fetched', wordData: action.wordData };
    case WORDCLOUD_RESET:
      return { status: 'initial', wordData: [] };
    case ADD_WORD:
      return { status: 'fetched', wordData: [...state.wordData, action.word] }
    default:
      return state;
  }
};

// Thunk

// fetch only adjectives
export const fetchAdjectiveWordcloudData = (searchId, query) => {
  return dispatch => {
    dispatch(wordcloudDataRequest());
    return axios
      .get(`/api/tweets/adjectives/${searchId}/${query}`)
      .then(response => response.data)
      .then(wordData => dispatch(wordcloudDataSuccess(wordData)))
      .catch(() => dispatch(wordcloudDataFailure()));
  };
};

// fetch only nouns
export const fetchNounWordcloudData = (searchId, query) => {
  return dispatch => {
    dispatch(wordcloudDataRequest());
    return axios
      .get(`/api/tweets/nouns/${searchId}/${query}`)
      .then(response => response.data)
      .then(wordData => dispatch(wordcloudDataSuccess(wordData)))
      .catch(() => dispatch(wordcloudDataFailure()));
  };
};
