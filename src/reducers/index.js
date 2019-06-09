import { combineReducers } from 'redux';
import { wordcloudData } from './wordcloudReducer';
import { tweets } from './tweetsReducer';
import { user } from './userReducer';
import { isLoading } from './loadingReducer';

const rootReducer = combineReducers({
  wordcloudData,
  user,
  tweets,
  isLoading,
});

export default rootReducer;
