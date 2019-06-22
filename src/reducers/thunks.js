import axios from 'axios';
import { fetchWordCloudSearches, fetchLineChartSearches, selectSearchId } from './searchesReducer';
import { fetchAdjectiveWordcloudData } from './wordcloudReducer';
import { fetchAdjectiveLineChartData } from './lineChartReducer';
import { emptyRemovedWords } from './removedReducer';

export const searchRequest = (searchType, searchText, userId, originalSearchId = null) => {

  return dispatch => {
    dispatch(emptyRemovedWords());

    return axios
      .post(`/api/tweets/search/${searchType}`, { query: searchText, userId })
      .then(response => response.data)
      .then(searchId => {
        dispatch(selectSearchId(searchId));
        dispatch(fetchAdjectiveWordcloudData(searchId, searchText));
        dispatch(fetchWordCloudSearches());
      })
      .then(() => {
        if (!originalSearchId) {
          console.log('trying to fetch')
          axios
            .post(`/api/tweets/search/timed/${searchType}`, { query: searchText, userId })
            .then(response => response.data)
            .then(searchId => {
              dispatch(fetchAdjectiveLineChartData(searchId, searchText));
              dispatch(fetchLineChartSearches());
            })
        } else {
          console.log('just grabbing from db!')
          dispatch(fetchAdjectiveLineChartData(originalSearchId, searchText));
          dispatch(fetchLineChartSearches());
        }
      })
      .catch(ex => console.error(ex))
  };
};
