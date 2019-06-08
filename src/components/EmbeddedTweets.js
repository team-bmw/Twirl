import React, { useEffect } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import { connect } from 'react-redux';

const EmbeddedTweets = ({ selectedTweets }) => {
  useEffect(() => { }, [selectedTweets]);
  return (
    <div>
      {selectedTweets.map(tweet => {
        return (
          !tweet.isRetweet ?
            <div key={tweet.twitterId} >
              <TwitterTweetEmbed tweetId={tweet.twitterId} options={{ cards: 'hidden' }} />
            </div>
            : null
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    selectedTweets: state.tweets.selectedTweets,
  };
};

export default connect(mapStateToProps)(EmbeddedTweets);
