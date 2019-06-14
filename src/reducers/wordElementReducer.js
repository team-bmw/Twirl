// ACTION
const SELECTED_WORD_ELEMENT = 'SELECTED_WORD_ELEMENT';

// ACTION CREATORS
export const selectedWordElement = wordElement => {
  return {
    type: SELECTED_WORD_ELEMENT,
    wordElement,
  }
};

// REDUCER
export const wordElement = (state = null, action) => {
  switch (action.type) {
    case SELECTED_WORD_ELEMENT:
      {
        return action.wordElement;
      }
    default:
      return state;
  }
};
