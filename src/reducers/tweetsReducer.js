// ACTION CONSTANTS
const UPDATE_SELECT_IDS = 'UPDATE_SELECT_IDS';

// ACTION CREATORS
export const updateSelectedIds = IDs => {
  return {
    type: UPDATE_SELECT_IDS,
    IDs,
  };
};

// INITIAL STATE
const initialState = {
  selectedIds: [],
};

// REDUCER

export const tweets = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELECT_IDS: {
      return { ...state, selectedIds: action.IDs };
    }
    default:
      return state;
  }
};
