import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core/';

import WordCloudComponent from './WordCloudComponent';
import Loading from '../Common/Loading';
import Message from '../Common/Message';
import EmbeddedTweets from '../EmbeddedTweets';

import { endLoading } from '../../reducers/loadingReducer';

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
    tweets,
    loading: { wordcloudIsLoading },
    wordcloudData: { status, wordData },
    endLoading,
  } = props;

  useEffect(() => {
    if (status === 'failed' || status === 'fetched')
      endLoading('wordcloudIsLoading');
  }, [tweets, status]);

  return (
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
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          xl={2}
          className={classes.tweetsList}
          align="center"
        >
          <EmbeddedTweets />
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
  { endLoading }
)(WordCloud);
