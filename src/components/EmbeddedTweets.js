import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { sortTweets } from '../helperFunctions';

const useStyles = makeStyles(theme => ({
  imageIcon: {
    height: 32,
  },
}));

const EmbeddedTweets = ({ selectedTweets, user }) => {
  const classes = useStyles();

  useEffect(() => {}, [selectedTweets]);
  return (
    <div>
      {sortTweets(selectedTweets, 'numRetweets', false).map((tweet, index) => {
        return (
          <div key={tweet.twitterId + index}>
            <TwitterTweetEmbed
              tweetId={tweet.twitterId}
              options={{ cards: 'hidden', width: 275 }}
            />

            <Button
              href={`https://twitter.com/intent/tweet?in_reply_to=${
                tweet.twitterId
              }`}
            >
              <img
                className={classes.imageIcon}
                src="Twitter_Reply.svg"
              />
              Reply
            </Button>

            <Button
              href={`href="https://twitter.com/intent/retweet?tweet_id=${
                tweet.twitterId
              }`}
            >
              <img
                className={classes.imageIcon}
                src="Twitter_Retweet.svg"
              />
              Reply
            </Button>

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
