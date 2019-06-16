import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

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
import { wordcloudDataSuccess, fetchAdjectiveWordcloudData } from '../../reducers/wordcloudReducer';
import { fetchSearches, selectSearchId } from '../../reducers/searchesReducer';

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
  fetchSearches,
  selectSearchId,
  searches,
}) => {
  const classes = useStyles();

  const handleClose = () => {
    selectWordElement(null);
  };

  const removeWord = () => {
    const filteredData = wordData.filter(
      wordObj => wordObj.text !== selectedCloudWord.text
    );
    wordcloudDataSuccess(filteredData);
    handleClose();
  };

  const addToSearch = () => {
    const currentQuery = searches.searches.find(search => search.search_id === searches.search_id).query;
    console.log(currentQuery);
    axios
      .post(`/api/tweets/search/and`, { query: `${currentQuery} ${selectedCloudWord.text}` })
      .then(search_id => {
        fetchAdjectiveWordcloudData(search_id.data, selectedCloudWord.text);
        selectSearchId(search_id.data)
      })
      .then(() => fetchSearches());
    //history.push(`/search/${selectedCloudWord.text}`);
  }

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
      <List component="nav" aria-label="Main mailbox folders">
        <ListItem
          button
          onClick={() => {
            updateSelectedTweets(selectedCloudWord.tweetData);
            handleClose();
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
    </Popover>
  );
};

const mapStateToProps = ({ wordElement, wordcloudData, searches }) => {
  return {
    wordElement,
    wordcloudData,
    searches,
  };
};

export default connect(
  mapStateToProps,
  {
    updateSelectedTweets,
    selectWordElement,
    wordcloudDataSuccess,
    fetchAdjectiveWordcloudData,
    fetchSearches,
    selectSearchId,
  }
)(WordPopover);
