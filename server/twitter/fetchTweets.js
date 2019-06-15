/* eslint-disable no-return-await */
/* eslint-disable handle-callback-err */
/* eslint-disable camelcase */

const { Tweet, Metadata } = require('../db/index');
const { scoreTweetSentiment } = require('./classifyTweets');

const client = require('./twitterSetup');

// // parse "next_results" string from search_metadata to get max_id term for next search
const getNextMaxId = str => {
  const terms = str.replace('?', '').split('&');
  const maxIdTerm = terms.find(term => term.includes('max_id'));
  return maxIdTerm ? maxIdTerm.split('=')[1] : null;
};

const createQueryString = (q, searchType) => {
  if (searchType === 'or') return q.split(' ').join(' OR ');
  if (searchType === 'exact') return `"${q}"`;
  if (searchType === 'hashtag') return `#${q}`;
  if (searchType === 'userFrom') return `from:${q}`;
  if (searchType === 'userTo') return `to:${q}`;
  if (searchType === 'mention') return `@${q}`;
  return q;
};

// get next set of tweets and save to database (also save metadata)
const getTweets = async (q, count, search_id, searchType, max_id = null) => {
  console.log(createQueryString(q, searchType));
  const tweets = await client.get('search/tweets', {
    q: `${createQueryString(q, searchType)} -filter:retweets`,
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
    }).catch(() => {
      --counter;
    });
  });

  await Metadata.create({
    query: q,
    count: counter,
    next_id: nextMaxId,
    search_id,
  });
  return Promise.all([counter, nextMaxId]);
};

// keep fetching tweets until reach total required number of tweets
const fetchTweets = async (q, total, lastSearchId, searchType) => {
  const search_id = lastSearchId ? ++lastSearchId : 1;

  let metadata = await getTweets(q, 100, search_id, searchType);
  let recordCount = metadata[0];
  let max_id = metadata[1];

  while (recordCount < total) {
    metadata = await getTweets(q, 100, search_id, searchType, max_id);
    recordCount += metadata[0];
    max_id = metadata[1];
  }

  return search_id;
};

module.exports = {
  fetchTweets,
  getTweets,
};
