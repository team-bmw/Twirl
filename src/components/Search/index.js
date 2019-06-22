import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core/';

import Wordcloud from './Wordcloud';
import LineChartTime from '../LineChartTime';
import BarChart from '../BarChart';
import Waffle from '../Waffle';
import Loading from '../Common/Loading';
import Message from '../Common/Message';
import EmbeddedTweets from '../EmbeddedTweets';
import SortTweets from '../SortTweets';

import { endLoading, startLoading } from '../../reducers/loadingReducer';
import { fetchWordCloudSearches, fetchLineChartSearches } from '../../reducers/searchesReducer';
import PastSearches from '../PastSearches';
import RemovedWords from '../RemovedWords';
import DisplaySwitch from './DisplaySwitch';
import { searchRequest } from '../../reducers/thunks';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      height: '90vh',
    },
    transform: 'translateY(3.5rem)',
  },
  input: {
    marginTop: theme.spacing(4),
  },
  button: {
    backgroundColor: theme.palette.secondary.contrastText,
  },
  tweetsList: {
    maxHeight: '100vh',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  cloudContainer: {
    [theme.breakpoints.up('lg')]: {
      height: '75vh',
    },
  },
}));

// eslint-disable-next-line complexity
const Search = props => {
  const classes = useStyles();

  const {
    match: { params },
    tweets,
    loading: { wordcloudIsLoading },
    wordcloudData: { status, wordData },
    endLoading,
    searchRequest,
    fetchWordCloudSearches,
    fetchLineChartSearches,
    user,
    searches,
  } = props;

  useEffect(() => {
    if (status === 'failed' || status === 'fetched')
      endLoading('wordcloudIsLoading');
  }, [tweets, status]);

  useEffect(() => {
    if (!props.loading.wordcloudIsLoading && params.searchText) {
      props.startLoading('wordcloudIsLoading');

      fetchWordCloudSearches();
      fetchLineChartSearches();

      // need to make sure the searches array are populated first
      const pastSearch = searches.lineChartSearches.find(s => s.query === params.searchText);
      const pastSearchId = pastSearch ? pastSearch.searchId : null;

      searchRequest(params.searchType, params.searchText, user.id, pastSearchId);
      props.history.push(`/search/${params.searchType}/${params.searchText}`);
    }
  }, []);

  const [chartType, setChartType] = useState('wordcloud');

  const selectChartToDisplay = typeOfChart => {
    return chartType === typeOfChart && status === 'fetched';
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="flex-start"
      className={classes.root}
      spacing={1}
    >
      <Grid
        item
        xs={12}
        lg={9}
        align="center"
        className={classes.cloudContainer}
      >
        <Grid container justify="space-between" alignItems="center">
          <DisplaySwitch chartType={chartType} setChartType={setChartType} />
          <PastSearches />
        </Grid>
        <Grid container alignItems="center">
          <RemovedWords />
        </Grid>
        {!wordcloudIsLoading && status === 'initial' && (
          <Message message="Please enter data" />
        )}
        {status === 'failed' && (
          <Message message="Data fetched unsuccessfully. Please try again." />
        )}
        {wordcloudIsLoading && <Loading />}
        {selectChartToDisplay('wordcloud') && <Wordcloud wordData={wordData} />}
        {selectChartToDisplay('barchart') && <BarChart wordData={wordData} />}
        {selectChartToDisplay('linechart') && <LineChartTime />}
        {selectChartToDisplay('waffle') && <Waffle wordData={wordData} />}
      </Grid>
      {tweets.selectedTweets.length ? (
        <Grid item xs={12} sm={6} lg={3}>
          <SortTweets />
          <div className={classes.tweetsList}>
            <EmbeddedTweets />
          </div>
        </Grid>
      ) : null}
    </Grid>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { endLoading, startLoading, searchRequest, fetchWordCloudSearches, fetchLineChartSearches }
)(Search);
