// ACTIONS
const SELECTED_WORD_DOM_ELEMENT = 'SELECTED_WORD_DOM_ELEMENT';
const SELECTED_CLOUD_WORD = 'SELECTED_CLOUD_WORD';

// ACTION CREATORS
export const selectWordElement = wordDomElement => {
  return {
    type: SELECTED_WORD_DOM_ELEMENT,
    wordDomElement,
  };
};

export const selectCloudWord = cloudWord => {
  return {
    type: SELECTED_CLOUD_WORD,
    cloudWord,
  };
};

// INITIAL STATE
const initialState = {
  selectedDomElement: null,
  selectedCloudWord: {},
};

// REDUCER
export const wordElement = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_WORD_DOM_ELEMENT:
      return {...state, selectedDomElement: action.wordDomElement};
      case SELECTED_CLOUD_WORD:
        return {...state, selectedCloudWord: action.cloudWord}
    default:
      return state;
  }
};
