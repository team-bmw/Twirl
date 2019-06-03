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
// Log a user in with Twitter
export const loginWithTwitter = () => {
  return dispatch => {
    return axios.get('http://localhost:3000/auth/twitter')
    .then(response => response.data)
    .then(user => dispatch(loggedInUser(user)))
    .catch(error => console.error(error))
  }
}
