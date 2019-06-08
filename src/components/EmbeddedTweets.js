import React, { useEffect } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import { connect } from 'react-redux';

const EmbeddedTweets = ({ tweetIds }) => {
  useEffect(() => { }, [tweetIds]);
  return (
    <div>
      {tweetIds.map(tweet => {
        console.log(tweet);
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
    tweetIds: state.tweets.selectedIds,
  };
};

export default connect(mapStateToProps)(EmbeddedTweets);
