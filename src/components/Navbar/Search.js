import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  InputBase,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { resetWordCloud } from '../../reducers/wordcloudReducer';
import { startLoading } from '../../reducers/loadingReducer';
import { emptySelectedTweets } from '../../reducers/tweetsReducer';
import { searchRequest } from '../../reducers/thunks';

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
    width: theme.spacing(5),
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
    padding: theme.spacing(1.5, 1.5, 1.5, 5),
    transition: theme.transitions.create('width'),
    width: 50,
    [theme.breakpoints.up('sm')]: {
      width: 120,
    },
    [theme.breakpoints.up('md')]: {
      width: 250,
    },
  },
  selectInput: {
    padding: theme.spacing(1.5, 3, 1.5, 1.5),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.down('xs')]: {
      width: 25,
    },
  },
}));

const Search = ({
  match,
  location,
  history,
  startLoading,
  resetWordCloud,
  emptySelectedTweets,
  searchRequest,
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
      searchRequest(searchType, searchText);
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
      <FormControl variant="outlined">
        <Select
          value={searchType}
          onChange={handleTypeOnChange}
          input={
            <OutlinedInput
              name="searchType"
              id="searchType-simple"
              classes={{
                root: classes.inputRoot,
                input: classes.selectInput,
              }}
            />
          }
        >
          <MenuItem value="and">AND</MenuItem>
          <MenuItem value="or">OR</MenuItem>
          <MenuItem value="exact">EXACT</MenuItem>
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
      startLoading,
      resetWordCloud,
      emptySelectedTweets,
      searchRequest,
    }
  )(Search)
);
