import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { sortTweets } from '../../helperFunctions';

import { makeStyles } from '@material-ui/core/styles';
import {
  Popover,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import { updateSelectedTweets } from '../../reducers/tweetsReducer';
import { selectWordElement } from '../../reducers/wordElementReducer';
import {
  wordcloudDataSuccess,
  fetchAdjectiveWordcloudData,
} from '../../reducers/wordcloudReducer';
import { fetchWordCloudSearches, selectSearchId } from '../../reducers/searchesReducer';
import { addRemovedWord } from '../../reducers/removedReducer';
import { updateSortBy } from '../../reducers/sortReducer';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const WordPopover = ({
  wordElement: { selectedDomElement, selectedCloudWord },
  wordcloudData: { wordData },
  selectWordElement,
  updateSelectedTweets,
  wordcloudDataSuccess,
  fetchAdjectiveWordcloudData,
  fetchWordCloudSearches,
  selectSearchId,
  addRemovedWord,
  updateSortBy,
  searches,
  sortBy,
  isAscending,
  history,
}) => {
  const classes = useStyles();

  const [removed, setRemoved] = useState([]);

  const handleClose = () => {
    selectWordElement(null);
  };

  const removeWord = () => {
    handleClose();
    removed.push(selectedCloudWord);
    const filteredData = wordData.filter(
      wordObj => wordObj.text !== selectedCloudWord.text
    );
    wordcloudDataSuccess(filteredData);
    addRemovedWord(selectedCloudWord);
    handleClose();
  };

  const addToSearch = () => {
    handleClose();
    const currentQuery = searches.wordCloudSearches.find(
      search => search.searchId === searches.searchId
    ).query;
    axios
      .post(`/api/tweets/search/and`, {
        query: `${currentQuery} ${selectedCloudWord.text}`,
      })
      .then(searchId => {
        fetchAdjectiveWordcloudData(searchId.data, selectedCloudWord.text);
        selectSearchId(searchId.data);
      })
      .then(() => fetchWordCloudSearches());
    history.push(`/search/and/${currentQuery} ${selectedCloudWord.text}`);
  };

  const open = Boolean(selectedDomElement);
  const id = open ? 'options-popover' : null;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={selectedDomElement}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
    >
      <List component="nav" aria-label="Wordcloud options">
        <ListItem
          button
          onClick={() => {
            updateSelectedTweets(sortTweets(selectedCloudWord.tweetData, sortBy, isAscending));
            updateSortBy('');
            handleClose();
            updateSelectedTweets(selectedCloudWord.tweetData);
          }}
        >
          <ListItemText primary="Show Tweets" />
        </ListItem>
        <ListItem button onClick={removeWord}>
          <ListItemText primary="Remove Word" />
        </ListItem>
        <ListItem button onClick={addToSearch}>
          <ListItemText primary="Add to Search" />
        </ListItem>
      </List>
    </Popover >
  );
};

const mapStateToProps = ({ wordElement, wordcloudData, searches, sortBy, isAscending }) => {
  return {
    wordElement,
    wordcloudData,
    searches,
    sortBy,
    isAscending,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      updateSelectedTweets,
      selectWordElement,
      wordcloudDataSuccess,
      fetchAdjectiveWordcloudData,
      fetchWordCloudSearches,
      selectSearchId,
      addRemovedWord,
      updateSortBy,
    }
  )(WordPopover)
);
