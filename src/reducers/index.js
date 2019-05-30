import { combineReducers } from 'redux';
import { wordcloudData } from './wordcloudReducer';

const rootReducer = combineReducers({
  wordcloudData,
});

export default rootReducer;
