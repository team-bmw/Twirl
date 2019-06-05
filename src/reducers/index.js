import { combineReducers } from 'redux';
import { wordcloudData } from './wordcloudReducer';
import { user } from './userReducer';

const rootReducer = combineReducers({
  wordcloudData,
  user,
});

export default rootReducer;
