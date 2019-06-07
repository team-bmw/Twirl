import React, { useEffect } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import { connect } from 'react-redux';

const EmbeddedTweets = ({ tweetIds }) => {
  useEffect(() => {}, [tweetIds]);
  return (
    <div>
      {tweetIds.map(id => {
        console.log(id);
        return (
          <div key={id}>
            <TwitterTweetEmbed tweetId={id} options={{ cards: 'hidden' }} />
          </div>
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
