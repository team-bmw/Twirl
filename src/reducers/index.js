import { combineReducers } from 'redux';
import { wordcloudData } from './wordcloudReducer';
import { tweets } from './tweetsReducer';
import { user } from './userReducer';
import { sort } from './sortReducer';

const rootReducer = combineReducers({
  wordcloudData,
  user,
  tweets,
  sort,
});

export default rootReducer;
