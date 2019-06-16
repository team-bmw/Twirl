// ACTION CONSTANTS
const UPDATE_REMOVED_WORDS = 'UPDATE_REMOVED_WORDS';
const EMPTY_REMOVED_WORDS = 'EMPTY_REMOVED_WORDS';

// ACTION CREATORS
export const updateRemovedWords = word => ({
    type: UPDATE_REMOVED_WORDS,
    word,
});

export const emptyRemovedWords = () => ({
    type: EMPTY_REMOVED_WORDS,
});

// INITIAL STATE
const initialState = {
    removedWords: [],
};

// REDUCER
export const removed = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REMOVED_WORDS: {
            return { ...state, removedWords: action.word };
        }
        case EMPTY_REMOVED_WORDS: {
            return { ...state, removedWords: [] };
        }
        default:
            return state;
    }
};
