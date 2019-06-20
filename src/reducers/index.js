import { combineReducers } from 'redux';
import { wordcloudData } from './wordcloudReducer';
import { tweets } from './tweetsReducer';
import { user } from './userReducer';
import { sort } from './sortReducer';
import { loading } from './loadingReducer';
import { searches } from './searchesReducer';
import { wordElement } from './wordElementReducer';
import { removedWords } from './removedReducer';
import { lineChartData } from './lineChartReducer';

const rootReducer = combineReducers({
  wordcloudData,
  user,
  tweets,
  sort,
  loading,
  searches,
  wordElement,
  removedWords,
  lineChartData,
});

export default rootReducer;
