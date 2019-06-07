import { combineReducers } from 'redux';
import { wordcloudData } from './wordcloudReducer';
import { tweets } from './tweetsReducer';
import { user } from './userReducer';

const rootReducer = combineReducers({
  wordcloudData,
  user,
  tweets,
});

export default rootReducer;
