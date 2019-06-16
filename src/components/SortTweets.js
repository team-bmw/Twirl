import React from 'react';
import { connect } from 'react-redux';
import { updateSortBy } from '../reducers/sortReducer';
import { updateSelectedTweets } from '../reducers/tweetsReducer';
import { sortTweets } from '../helperFunctions';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sort: {
    width: '50%',
    padding: theme.spacing(1),
  },
  descending: {
    // width: '60%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SortTweets = ({ selectedTweets, updateSelectedTweets }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    sortBy: '',
    ascendingSort: true,
  });

  const handleChange = ({ target }) => {
    setValues(oldValues => ({
      ...oldValues,
      [target.name]: target.value,
    }));
    updateSelectedTweets(
      sortTweets(selectedTweets, target.value, values.ascendingSort)
    );
    updateSortBy(target.value);
  };

  const handleSwitch = () => {
    setValues(oldValues => ({
      ...oldValues,
      ascendingSort: !values.ascendingSort,
    }));
    updateSelectedTweets(
      sortTweets(selectedTweets, values.sortBy, !values.ascendingSort)
    );
  };

  return (
    <div>
      {selectedTweets.length > 0 ? (
        <div>
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.sort}>
              <InputLabel htmlFor="sortBy-simple">Sort By</InputLabel>
              <Select
                value={values.sortBy}
                onChange={handleChange}
                inputProps={{
                  name: 'sortBy',
                  id: 'sortBy-simple',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="numRetweets">Number of Retweets</MenuItem>
                <MenuItem value="numFollowers">Number of Followers</MenuItem>
                <MenuItem value="twitterId">Most Recent</MenuItem>
                <MenuItem value="isVerified">Verified Users</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.descending}>
              <FormControlLabel
                htmlFor="ascendingSort-simple"
                control={
                  values.sortBy ? (
                    <Switch
                      onChange={handleSwitch}
                      inputProps={{
                        'aria-label': 'Switch A',
                        id: 'ascendingSort-simple',
                      }}
                    />
                  ) : (
                    <Switch disabled />
                  )
                }
                label="Descending"
                labelPlacement="start"
              />
            </FormControl>
          </form>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ tweets }) => {
  return {
    selectedTweets: tweets.selectedTweets.filter(tweet => !tweet.isRetweet),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSortBy: sortBy => dispatch(updateSortBy(sortBy)),
    updateSelectedTweets: tweets => dispatch(updateSelectedTweets(tweets)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortTweets);
