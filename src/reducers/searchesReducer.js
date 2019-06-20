import axios from 'axios';

// ACTION CONSTANTS
const UPDATE_WORDCLOUD_SEARCHES = 'UPDATE_WORDCLOUD_SEARCHES';
const UPDATE_LINECHART_SEARCHES = 'UPDATE_LINECHART_SEARCHES';
const SELECT_SEARCH = 'SELECT_SEARCH';

// ACTION CREATORS
export const updateWordCloudSearches = searches => ({
    type: UPDATE_WORDCLOUD_SEARCHES,
    searches,
});

export const updateLineChartSearches = searches => ({
    type: UPDATE_LINECHART_SEARCHES,
    searches,
});

export const selectSearchId = searchId => ({
    type: SELECT_SEARCH,
    searchId,
})

// INITIAL STATE
const initialState = {
    wordCloudSearches: [],
    lineChartSearches: [],
    searchId: 1,
};

// REDUCER
export const searches = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_WORDCLOUD_SEARCHES: {
            return { ...state, wordCloudSearches: action.searches };
        }
        case UPDATE_LINECHART_SEARCHES: {
            return { ...state, lineChartSearches: action.searches };
        }
        case SELECT_SEARCH: {
            return { ...state, searchId: action.searchId };
        }
        default:
            return state;
    }
};

// THUNKS
export const fetchWordCloudSearches = () => {
    return dispatch => {
        return axios.get('/api/searches/wordcloud')
            .then(res => res.data)
            .then(allSearches => dispatch(updateWordCloudSearches(allSearches)))
    }
};

export const fetchLineChartSearches = () => {
    return dispatch => {
        return axios.get('/api/searches/linechart')
            .then(res => res.data)
            .then(allSearches => dispatch(updateLineChartSearches(allSearches)))
    }
};
