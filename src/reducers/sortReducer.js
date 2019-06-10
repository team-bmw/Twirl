// ACTION CONSTANTS
const UPDATE_SORT = 'UPDATE_SORT';

// ACTION CREATORS
export const updateSortBy = sortBy => {
    return {
        type: UPDATE_SORT,
        sortBy,
    };
};

// INITIAL STATE
const initialState = {
    sortBy: '',
};

// REDUCER
export const sort = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SORT: {
            return { ...state, sortBy: action.sortBy };
        }
        default:
            return state;
    }
};

