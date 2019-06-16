// ACTION CONSTANTS
const UPDATE_SORT = 'UPDATE_SORT';
const UPDATE_IS_ASCENDING = 'UPDATE_IS_ASCENDING';

// ACTION CREATORS
export const updateSortBy = sortBy => {
    return {
        type: UPDATE_SORT,
        sortBy,
    };
};

export const updateIsAscending = () => {
    return {
        type: UPDATE_IS_ASCENDING,
    }
}

// INITIAL STATE
const initialState = {
    sortBy: '',
    isAscending: true,
};

// REDUCER
export const sort = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SORT: {
            return { ...state, sortBy: action.sortBy };
        }
        case UPDATE_IS_ASCENDING: {
            const isAscending = !state.isAscending;
            return { ...state, isAscending }
        }
        default:
            return state;
    }
};

