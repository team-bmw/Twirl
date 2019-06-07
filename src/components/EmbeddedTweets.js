import React, { useEffect } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

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

export default EmbeddedTweets;
