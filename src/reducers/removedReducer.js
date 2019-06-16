// ACTION CONSTANTS
const UPDATE_REMOVED_WORD = 'UPDATE_REMOVED_WORD';
const DELETE_REMOVED_WORD = 'DELETE_REMOVED_WORD';
const EMPTY_REMOVED_WORDS = 'EMPTY_REMOVED_WORDS';

// ACTION CREATORS
export const addRemovedWord = word => ({
    type: UPDATE_REMOVED_WORD,
    word,
});

export const deleteRemovedWord = word => ({
    type: DELETE_REMOVED_WORD,
    word,
})

export const emptyRemovedWords = () => ({
    type: EMPTY_REMOVED_WORDS,
})

// INITIAL STATE
const initialState = [];

// REDUCER
export const removedWords = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REMOVED_WORD: {
            return [...state, action.word];
        }
        case DELETE_REMOVED_WORD: {
            return [...state].filter(word => word.text !== action.word.text);
        }
        case EMPTY_REMOVED_WORDS: {
            return [];
        }
        default:
            return state;
    }
};
