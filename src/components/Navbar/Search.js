import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { fetchAdjectiveWordcloudData, resetWordCloud } from '../../reducers/wordcloudReducer';
import { startLoading } from '../../reducers/loadingReducer';
import { emptySelectedTweets } from '../../reducers/tweetsReducer';
import { fetchSearches } from '../../reducers/searchesReducer';


const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.9),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
  },
  searchIcon: {
    color: theme.palette.primary.main,
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: theme.palette.primary.main,
  },
  inputInput: {
    padding: theme.spacing(1.5, 1.5, 1.5, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 250,
    },
  },
}));


const Search = ({
  match,
  history,
  fetchAdjectiveWordcloudData,
  startLoading,
  resetWordCloud,
  emptySelectedTweets,
  fetchSearches,
}) => {
  const classes = useStyles();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (match.params.searchedText) setQuery(match.params.searchedText);
  }, [])

  const handleOnChange = ({ target }) => {
    setQuery(target.value);
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    if (query) {
      resetWordCloud();
      emptySelectedTweets();
      startLoading('wordcloudIsLoading');
      axios.post('/api/tweets/search', { query })
        .then(search_id => fetchAdjectiveWordcloudData(search_id.data))
        .then(() => fetchSearches());
      history.push(`/search/${query}`)
    }
  };

  return (
    <form className={classes.search} onSubmit={handleOnSubmit}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search Twitter"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'Search' }}
        onChange={handleOnChange}
        value={query}
      />
    </form>
  )
};

export default withRouter(
  connect(null, {
    fetchAdjectiveWordcloudData,
    startLoading,
    resetWordCloud,
    emptySelectedTweets,
    fetchSearches,
  })(Search)
);
