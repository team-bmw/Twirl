
import React from 'react';
import { connect } from 'react-redux';
import { selectSearchId } from '../reducers/searchesReducer';
import { fetchAdjectiveWordcloudData } from '../reducers/wordcloudReducer';
import { emptySelectedTweets } from '../reducers/tweetsReducer';
import { emptyRemovedWords } from '../reducers/removedReducer';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'white',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  labelFormatting: {
    color: 'white',
  },
}));

const PastSearches = ({
  selectSearchId,
  fetchAdjectiveWordcloudData,
  searches,
  emptySelectedTweets,
  emptyRemovedWords,
  user,
}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    searchId: '',
  });

  const handleChange = ({ target }) => {
    setValues(oldValues => ({
      ...oldValues,
      [target.name]: target.value,
    }));
    selectSearchId(Number(target.value));
    fetchAdjectiveWordcloudData(Number(target.value));
    selectSearchId(target.value);
    emptyRemovedWords();
    emptySelectedTweets();
  };

  return (
    <div>
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.labelFormatting} htmlFor="id-simple">
            Past Searches
          </InputLabel>
          <Select
            className={classes.labelFormatting}
            value={values.searchId}
            onChange={handleChange}
            inputProps={{
              name: 'searchId',
              id: 'id-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {searches.searchId % 2 ? searches.wordCloudSearches.map(search => {
              if (!search.userId || (user.id && user.id === search.userId)) {
                return (
                  <MenuItem key={search.searchId} value={search.searchId}>
                    {`wordcloud: ${search.query}`}
                  </MenuItem>
                );
              }
              return null;
            })
              : searches.lineChartSearches.map(search => {
                if (!search.userId || (user.id && user.id === search.userId)) {
                  return (
                    <MenuItem key={search.searchId} value={search.searchId}>
                      {`line: ${search.query}`}
                    </MenuItem>
                  );
                }
                return null;
              })}
          </Select>
        </FormControl>
      </form>
    </div>
  );
};

const mapStateToProps = ({ searches, user }) => {
  return {
    searches,
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectSearchId: searchId => dispatch(selectSearchId(searchId)),
    fetchAdjectiveWordcloudData: searchId =>
      dispatch(fetchAdjectiveWordcloudData(searchId)),
    emptySelectedTweets: () => dispatch(emptySelectedTweets()),
    emptyRemovedWords: () => dispatch(emptyRemovedWords()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PastSearches);
