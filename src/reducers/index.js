import { combineReducers } from 'redux';
import { wordcloudData } from './wordcloudReducer';
import { tweets } from './tweetsReducer';
import { user } from './userReducer';
import { loading } from './loadingReducer';

const rootReducer = combineReducers({
  wordcloudData,
  user,
  tweets,
  loading,
});

export default rootReducer;
