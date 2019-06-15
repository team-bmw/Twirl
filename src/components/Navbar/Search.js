import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import {
  fetchAdjectiveWordcloudData,
  resetWordCloud,
} from '../../reducers/wordcloudReducer';
import { startLoading } from '../../reducers/loadingReducer';
import { emptySelectedTweets } from '../../reducers/tweetsReducer';
import { fetchSearches } from '../../reducers/searchesReducer';

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
  location,
  history,
  fetchAdjectiveWordcloudData,
  startLoading,
  resetWordCloud,
  emptySelectedTweets,
  fetchSearches,
}) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    query: '',
    searchType: 'and',
  });

  useEffect(() => {
    const searchedText = location.pathname.split('/')[2];
    if (searchedText) setValues(searchedText);
  }, []);

  const handleOnChange = ({ target }) => {
    console.log(values);
    setValues(oldValues => ({
      ...oldValues,
      [target.name]: target.value,
    }));
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    if (values.query) {
      resetWordCloud();
      emptySelectedTweets();
      startLoading('wordcloudIsLoading');
      axios
        .post(`/api/tweets/search/${values.searchType}`, { query: values.query })
        .then(search_id => fetchAdjectiveWordcloudData(search_id.data))
        .then(() => fetchSearches());
      history.push(`/search/${values.query}`);
    }
  };

  return (
    <div className={classes.root}>
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
          onChange={handleOnChange}
          value={values.query}
        />
      </form>
      <form>
        <FormControl className={classes.search}>
          <Select
            value={values.searchType}
            onChange={handleOnChange}
            inputProps={{
              name: 'searchType',
              id: 'searchType-simple',
            }}
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
    </div>
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
    }
  )(Search)
);
