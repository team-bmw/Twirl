import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SortTweets from './SortTweets';
import TweetInfo from './TweetInfo';

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
  }
}));

const EmbeddedTweets = ({ selectedTweets, user }) => {
  const classes = useStyles();
  useEffect(() => { }, [selectedTweets]);
  return (
    <div>
      {selectedTweets.map((tweet, index) => {
        return (
          <div key={tweet.twitterId + index} className={classes.tweet}>
            <TwitterTweetEmbed
              tweetId={tweet.twitterId}
              options={{ cards: 'hidden', width: '100%', align: 'center' }}
            />
            
            <TweetInfo followers={tweet.numFollowers} retweets={tweet.numRetweets} />

            {user.id && (
              <div className={classes.buttons}>
                <Button size="small"
                  href={`https://twitter.com/intent/tweet?in_reply_to=${
                    tweet.twitterId
                    }`}
                >
                  <img className={classes.imageIcon} src="/Twitter_Reply.svg" />
                  Reply
                </Button>

                <Button size="small"
                  href={`https://twitter.com/intent/retweet?tweet_id=${
                    tweet.twitterId
                    }`}
                >
                  <img
                    className={classes.imageIcon}
                    src="/Twitter_Retweet.svg"
                  />
                  Retweet
                </Button>
              </div>
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
