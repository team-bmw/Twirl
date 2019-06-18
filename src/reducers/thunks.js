import axios from 'axios';
import { fetchWordCloudSearches, fetchLineChartSearches, selectSearchId } from './searchesReducer';
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
        dispatch(fetchWordCloudSearches());
      })
      .then(() => axios
        .post(`/api/tweets/search/timed/${searchType}`, { query: searchText }))
      .then(response => response.data)
      .then(searchId => {
        dispatch(fetchAdjectiveLineChartData(searchId, searchText));
        dispatch(fetchLineChartSearches());
      })
      .catch(ex => console.error(ex))
  };
};
