import React, { useEffect } from 'react';
import { TwitterTweetEmbed, TwitterDMButton } from 'react-twitter-embed';

import { connect } from 'react-redux';

const EmbeddedTweets = ({ selectedTweets, user }) => {
  useEffect(() => {}, [selectedTweets]);
  return (
    <div>
      {selectedTweets.map(tweet => {
        return !tweet.isRetweet ? (
          <div key={tweet.twitterId}>
            <TwitterTweetEmbed
              tweetId={tweet.twitterId}
              options={{ cards: 'hidden' }}
            />
            <TwitterDMButton
              id={3805104374}
              options={{ size: 'large' }}
            />
          </div>
        ) : null;
      })}
    </div>
  );
};

const mapStateToProps = ({tweets, user}) => {
  return {
    selectedTweets: tweets.selectedTweets,
    user
  };
};

export default connect(mapStateToProps)(EmbeddedTweets);
