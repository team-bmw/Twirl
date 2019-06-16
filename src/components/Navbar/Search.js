import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  InputBase,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import {
  fetchAdjectiveWordcloudData,
  resetWordCloud,
} from '../../reducers/wordcloudReducer';
import { startLoading } from '../../reducers/loadingReducer';
import { emptySelectedTweets } from '../../reducers/tweetsReducer';
import { fetchSearches, selectSearchId } from '../../reducers/searchesReducer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.9),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
  },
  control: {
    height: 43,
  },
  select: {
    height: '100%',
    borderColor: theme.palette.primary.main,
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
    [theme.breakpoints.up('xs')]: {
      width: 50,
    },
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));

const Search = ({
  match,
  location,
  history,
  fetchAdjectiveWordcloudData,
  startLoading,
  resetWordCloud,
  emptySelectedTweets,
  fetchSearches,
  selectSearchId,
}) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState('and');

  useEffect(() => {
    const searchedType = location.pathname.split('/')[2];
    const searchedText = location.pathname.split('/')[3];
    if (searchedType) setSearchType(searchedType);
    if (searchedText) setSearchText(searchedText);
  }, []);

  const handleTypeOnChange = ({ target }) => {
    setSearchType(target.value);
  };

  const handleTextOnChange = ({ target }) => {
    setSearchText(target.value);
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    if (searchText) {
      resetWordCloud();
      emptySelectedTweets();
      startLoading('wordcloudIsLoading');
      axios
        .post(`/api/tweets/search/${searchType}`, { query: searchText })
        .then(search_id => {
          fetchAdjectiveWordcloudData(search_id.data, searchText);
          selectSearchId(search_id.data);
        })
        .then(() => fetchSearches());
      history.push(`/search/${searchType}/${searchText}`);
    }
  };

  return (
    <form className={classes.search} onSubmit={handleOnSubmit}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        name="query"
        placeholder="Search Twitter"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'Search' }}
        onChange={handleTextOnChange}
        value={searchText}
      />
      <FormControl variant="outlined" className={classes.control}>
        <Select
          value={searchType}
          onChange={handleTypeOnChange}
          input={
            <OutlinedInput
              name="searchType"
              id="searchType-simple"
              className={classes.select}
            />
          }
        >
          <MenuItem value="and">AND</MenuItem>
          <MenuItem value="or">OR</MenuItem>
          <MenuItem value="or">EXACT</MenuItem>
          <MenuItem value="mention">@</MenuItem>
          <MenuItem value="hashtag">#</MenuItem>
          <MenuItem value="userTo">TO</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
};

export default withRouter(
  connect(
    null,
    {
      fetchAdjectiveWordcloudData,
      startLoading,
      resetWordCloud,
      emptySelectedTweets,
      fetchSearches,
      selectSearchId,
    }
  )(Search)
);
