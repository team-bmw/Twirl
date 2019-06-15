import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core/';

import WordCloudComponent from './WordCloudComponent';
import Loading from '../Common/Loading';
import Message from '../Common/Message';
import EmbeddedTweets from '../EmbeddedTweets';
import SortTweets from '../SortTweets';
import Sidebar from '../Sidebar';

import { fetchAdjectiveWordcloudData } from '../../reducers/wordcloudReducer';
import { endLoading, startLoading } from '../../reducers/loadingReducer';
import { fetchSearches } from '../../reducers/searchesReducer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    width: '100%',
    height: '100vh',
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
    height: '85vh',
  },
}));

const WordCloud = props => {
  const classes = useStyles();

  const {
    match: { params },
    tweets,
    loading: { wordcloudIsLoading },
    wordcloudData: { status, wordData },
    endLoading,
    fetchAdjectiveWordcloudData,
    fetchSearches,
  } = props;

  useEffect(() => {
    if (status === 'failed' || status === 'fetched')
      endLoading('wordcloudIsLoading');
  }, [tweets, status]);

  useEffect(() => {
    // search page with no searchText
    if (!props.loading.wordcloudIsLoading && params.searchText) {
      props.startLoading('wordcloudIsLoading');
      console.log(params.searchText);
      axios
        .post(`/api/tweets/search/${params.searchType}`, {
          query: params.searchText,
        })
        .then(search_id => fetchAdjectiveWordcloudData(search_id.data))
        .then(() => fetchSearches());
      props.history.push(
        `/search/${params.searchType}/${params.searchText}`
      );
    }
  }, []);

  return (
    <div>
      <Sidebar />
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid
          item
          xs={12}
          md={9}
          xl={10}
          align="center"
          className={classes.cloudContainer}
        >
          {!wordcloudIsLoading && status === 'initial' && (
            <Message message="Please enter data" />
          )}
          {status === 'failed' && (
            <Message message="Data fetched unsuccessfully. Please try again." />
          )}
          {wordcloudIsLoading && <Loading />}
          {status === 'fetched' && <WordCloudComponent wordData={wordData} />}
        </Grid>
        {tweets.selectedTweets.length ? (
          <Grid item xs={12} sm={6} md={3} xl={2} align="center">
            <SortTweets />
            <div className={classes.tweetsList}>
              <EmbeddedTweets />
            </div>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { endLoading, startLoading, fetchAdjectiveWordcloudData, fetchSearches }
)(WordCloud);
