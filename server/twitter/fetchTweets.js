/* eslint-disable no-return-await */
/* eslint-disable handle-callback-err */
/* eslint-disable camelcase */

// // Use search/tweets endpoint on loop to fetch tweets
const Twitter = require('twitter');
require('dotenv').config();

const { Tweet, Metadata } = require('../db/index');
const { scoreTweetSentiment } = require('./classifyTweets');

// Change out keys here:
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// // parse "next_results" string from search_metadata to get max_id term for next search
const getNextMaxId = str => {
  const terms = str.replace('?', '').split('&');
  const maxIdTerm = terms.find(term => term.includes('max_id'));
  return maxIdTerm ? maxIdTerm.split('=')[1] : null;
};

// get next set of tweets and save to database (also save metadata)
const getTweets = async (q, count, search_id, max_id = null) => {
  const tweets = await client.get('search/tweets', {
    q: `${q} -filter:retweets`,
    count,
    max_id,
    lang: 'en',
    tweet_mode: 'extended',
  });

  let counter = 0;
  let nextMaxId = getNextMaxId(tweets.search_metadata.next_results);

  await tweets.statuses.forEach(element => {
    ++counter;
    Tweet.create({
      query: q,
      text: element.full_text,
      isRetweet: !!element.retweetwed_status,
      location: element.user.location,
      numFollowers: element.user.followers_count,
      numFriends: element.user.friends_count,
      numFavorites: element.favorite_count,
      numRetweets: element.retweet_count,
      userVerified: element.user.verified,
      sentiment: scoreTweetSentiment(element.full_text),
      twitterId: `${element.id_str}`,
      twitterUserId: element.user.id,
      twitterScreenName: element.user.screen_name,
      search_id,
    })
      .catch(() => {
        --counter;
      });
  });

  await Metadata.create({ query: q, count: counter, next_id: nextMaxId, search_id });
  return Promise.all([counter, nextMaxId]);
};

// keep fetching tweets until reach total required number of tweets
const fetchTweets = async (q, total) => {

  const prevSearch = await Metadata.findOne({
    attributes: ['search_id'],
  })

  const search_id = 1; // prevSearch ? prevSearch + 1 : 1;
  // if (prevSearch) console.log(prevSearch.data);

  let metadata = await getTweets(q, 100, search_id);
  let recordCount = metadata[0];
  let max_id = metadata[1];

  while (recordCount < total) {
    metadata = await getTweets(q, 100, search_id, max_id);
    recordCount += metadata[0];
    max_id = metadata[1];
  }
};

module.exports = {
  fetchTweets,
  getTweets,
};
