import React, { useEffect } from 'react';
import { sortTweets } from '../helperFunctions';
import { TwitterTweetEmbed, TwitterDMButton } from 'react-twitter-embed';

import { connect } from 'react-redux';

const EmbeddedTweets = ({ selectedTweets, user }) => {
  useEffect(() => { }, [selectedTweets]);
  return (
    <div>
      {sortTweets(selectedTweets, 'numRetweets', false).map(tweet => {
        console.log(tweet.twitterId);
        return !tweet.isRetweet ? (
          <div key={tweet.twitterId}>
            <TwitterTweetEmbed
              tweetId={tweet.twitterId}
              options={{ cards: 'hidden' }}
            />
            <TwitterDMButton
              id={parseInt(tweet.twitterUserId)}
              options={{ size: 'large'}}
            />
          </div>
        ) : null;
      })}
    </div>
  );
};

const mapStateToProps = ({ tweets, user }) => {
  return {
    selectedTweets: tweets.selectedTweets,
    user
  };
};

export default connect(mapStateToProps)(EmbeddedTweets);
