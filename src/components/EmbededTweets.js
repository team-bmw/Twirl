import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const EmbededTweets = ({ tweetIds }) => {
  return (
    <div>
        {tweetIds.map(id => {
        console.log(id)
          return (
              <TwitterTweetEmbed key={id} tweetId={id} options={{cards: 'hidden'}}/>
          )
        })}
      </div>
  )
}


export default EmbededTweets;