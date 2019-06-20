import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import TweetInfo from './TweetInfo';
import TweetResponder from './TweetResponder';

import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  tweet: {
    marginBottom: theme.spacing(0),
  },
  imageIcon: {
    height: 24,
  },
  buttons: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: theme.spacing(0, 0),
    marginTop: theme.spacing(-1),
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
}));

const EmbeddedTweets = ({ selectedTweets, user }) => {
  const classes = useStyles();
  useEffect(() => {}, [selectedTweets]);
  return (
    <div>
      {selectedTweets.map((tweet, index) => {
        return (
          <div key={tweet.twitterId + index} className={classes.tweet}>
            <Paper>
              <TweetInfo
                followers={tweet.numFollowers}
                retweets={tweet.numRetweets}
              />
              <TwitterTweetEmbed
                tweetId={tweet.twitterId}
                options={{ cards: 'hidden', width: '100%', align: 'center' }}
              />
            </Paper>
            {user.id && (
              <TweetResponder
                twitterScreenName={tweet.twitterScreenName}
                twitterId={tweet.twitterId}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ tweets, user }) => {
  return {
    selectedTweets: tweets.selectedTweets.filter(tweet => !tweet.isRetweet),
    user,
  };
};

export default connect(mapStateToProps)(EmbeddedTweets);
