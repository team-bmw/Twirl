import axios from 'axios';
import { fetchWordCloudSearches, fetchLineChartSearches, selectSearchId } from './searchesReducer';
import { fetchAdjectiveWordcloudData } from './wordcloudReducer';
import { fetchAdjectiveLineChartData } from './lineChartReducer';
import { emptyRemovedWords } from './removedReducer';

export const searchRequest = (searchType, searchText, userId) => {

  return dispatch => {
    dispatch(emptyRemovedWords());

    return axios
      .post(`/api/tweets/search/${searchType}`, { query: searchText, userId })
      .then(response => response.data)
      .then(searchId => {
        dispatch(selectSearchId(searchId));
        dispatch(fetchAdjectiveWordcloudData(searchId, searchText));
        dispatch(fetchWordCloudSearches());
        return dispatch(fetchLineChartSearches());
      })
      .then(({ searches }) => {
        const pastSearch = searches.find(s => s.query === searchText);
        const originalSearchId = pastSearch ? pastSearch.searchId : null;

        if (!originalSearchId) {
          axios
            .post(`/api/tweets/search/timed/${searchType}`, { query: searchText, userId })
            .then(response => response.data)
            .then(searchId => {
              dispatch(fetchAdjectiveLineChartData(searchId, searchText));
              dispatch(fetchLineChartSearches());
            })
        } else {
          dispatch(fetchAdjectiveLineChartData(originalSearchId, searchText));
        }
      })
      .catch(ex => console.error(ex));
  };
};
