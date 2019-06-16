import { combineReducers } from 'redux';
import { wordcloudData } from './wordcloudReducer';
import { tweets } from './tweetsReducer';
import { user } from './userReducer';
import { sort } from './sortReducer';
import { loading } from './loadingReducer';
import { searches } from './searchesReducer';
import { wordElement } from './wordElementReducer';
import { removed } from './removedReducer';

const rootReducer = combineReducers({
  wordcloudData,
  user,
  tweets,
  sort,
  loading,
  searches,
  wordElement,
  removed,
});

export default rootReducer;
