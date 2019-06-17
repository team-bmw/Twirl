import axios from 'axios';
import { fetchSearches, selectSearchId } from './searchesReducer';
import { fetchAdjectiveWordcloudData } from './wordcloudReducer';
import { fetchAdjectiveLineChartData } from './lineChartReducer';

export const searchRequest = (searchType, searchText) => {
  return dispatch => {
    return axios
      .post(`/api/tweets/search/${searchType}`, { query: searchText })
      .then(response => response.data)
      .then(searchId => {
        dispatch(selectSearchId(searchId));
        dispatch(fetchAdjectiveWordcloudData(searchId, searchText));
        dispatch(fetchSearches())
      })
      .then(() => axios
      .post(`/api/tweets/search/timed/${searchType}`, {query: searchText}))
      .then(response => response.data)
      .then(searchId => {
        // dispatch(selectSearchId(searchId));
        dispatch(fetchAdjectiveLineChartData(searchId, searchText));
      })
      .catch(ex => console.error(ex))
  };
};
