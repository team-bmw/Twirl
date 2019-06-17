import axios from 'axios';

// Action types
const LINE_CHART_DATA_REQUEST = 'LINE_CHART_DATA_REQUEST';
const LINE_CHART_DATA_FAILURE = 'LINE_CHART_DATA_FAILURE';
const LINE_CHART_DATA_SUCCESS = 'LINE_CHART_DATA_SUCCESS';
const LINE_CHART_RESET = 'LINE_CHART_RESET';
const ADD_WORD = 'ADD_WORD';

// Action creators
const lineChartDataRequest = () => {
  return {
    type: LINE_CHART_DATA_REQUEST,
  };
};

const lineChartDataFailure = () => {
  return {
    type: LINE_CHART_DATA_FAILURE,
  };
};

export const lineChartDataSuccess = wordData => {
  return {
    type: LINE_CHART_DATA_SUCCESS,
    wordData,
  };
};

export const resetLineChart = () => ({
  type: LINE_CHART_RESET,
});

export const addWordToLineChart = word => ({
  type: ADD_WORD,
  word,
});

const initialState = { status: 'initial', wordData: [] };

// Reducer
export const lineChartData = (state = initialState, action) => {
  switch (action.type) {
    case LINE_CHART_DATA_REQUEST:
      return { status: 'fetching', wordData: [] };
    case LINE_CHART_DATA_FAILURE:
      return { status: 'failed', wordData: [] };
    case LINE_CHART_DATA_SUCCESS:
      return { status: 'fetched', wordData: action.wordData };
    case LINE_CHART_RESET:
      return { status: 'initial', wordData: [] };
    case ADD_WORD:
      return { status: 'fetched', wordData: [...state.wordData, action.word] }
    default:
      return state;
  }
};

// Thunk
// fetch only adjectives
export const fetchAdjectiveLineChartData = (search_id, query) => {
  return dispatch => {
    dispatch(lineChartDataRequest());
    return axios
      .get(`/api/tweets/adjectives/lineChart/${search_id}/${query}`)
      .then(response => response.data)
      .then(wordData => dispatch(lineChartDataSuccess(wordData)))
      .catch(() => dispatch(lineChartDataFailure()));
  };
};
