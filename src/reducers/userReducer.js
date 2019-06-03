import axios from 'axios';

const LOGGED_IN_USER = 'LOGGED_IN_USER';

const loggedInUser = user => {
  return {
    type: LOGGED_IN_USER,
    user,
  };
};

export const user = (state = {}, action) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return action.user;
    default:
      return state;
  }
};

// Thunks
// Check session for logged in user
export const loginSession = () => {
  return dispatch => {
    return axios.get('/auth/loggedIn')
    .then(response => response.data)
    .then(user => dispatch(loggedInUser(user)))
  }
}

// Log a user out
export const logOutUser = () => {
  return dispatch => {
    return axios.delete('/auth/logout')
    .then(() => dispatch(loggedInUser({})))
  }
}
