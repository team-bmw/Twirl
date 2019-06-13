import axios from 'axios';

// ACTION CONSTANTS
const UPDATE_SEARCHES = 'UPDATE_SEARCHES';
const SELECT_SEARCH = 'SELECT_SEARCH';

// ACTION CREATORS
export const updateSearches = searches => ({
    type: UPDATE_SEARCHES,
    searches,
});

export const selectSearchId = search_id => ({
    type: SELECT_SEARCH,
    search_id,
})

// INITIAL STATE
const initialState = {
    searches: [],
    search_id: 1,
};

// REDUCER
export const searches = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCHES: {
            return { ...state, searches: action.searches };
        }
        case SELECT_SEARCH: {
            return { ...state, search_id: action.search_id };
        }
        default:
            return state;
    }
};

// THUNKS
export const fetchSearches = () => {
    return dispatch => {
        return axios.get('/api/searches/')
            .then(res => res.data)
            .then(allSearches => dispatch(updateSearches(allSearches)))
    }
};
