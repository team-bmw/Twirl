// ACTION CONSTANTS
const UPDATE_REMOVED_WORDS = 'UPDATE_REMOVED_WORDS';
const EMPTY_REMOVED_WORDS = 'EMPTY_REMOVED_WORDS';

// ACTION CREATORS
export const updateRemovedWords = words => ({
    type: UPDATE_REMOVED_WORDS,
    words,
});

export const emptyRemovedWords = () => ({
    type: EMPTY_REMOVED_WORDS,
});

// INITIAL STATE
const initialState = [];

// REDUCER
export const removedWords = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REMOVED_WORDS: {
            return action.words;
        }
        case EMPTY_REMOVED_WORDS: {
            return [];
        }
        default:
            return state;
    }
};
