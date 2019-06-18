
// Purpose: Fetch most recent tweets for a given query string

const { Tweet, Metadata } = require('../db/index');
const { scoreTweetSentiment } = require('./classifyTweets');
const { createQueryString, getNextMaxId } = require('./helperFunctions');

const client = require('./twitterSetup');

// getTweets: fetch next 100 tweets and save to database
const getTweets = async (q, count, searchId, searchType, max_id = null) => {

  const tweets = await client.get('search/tweets', {
    q: `${createQueryString(q, searchType)} -filter:retweets`,
    count,
    max_id,
    lang: 'en',
    tweet_mode: 'extended',
  });

  let counter = 0;
  let nextMaxId = getNextMaxId(tweets.search_metadata.next_results);

  if (nextMaxId > -1) {

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
        twitterDate: element.created_at,
        twitterScreenName: element.user.screen_name,
        searchId,
      }).catch(() => {
        --counter;
      });
    });

    await Metadata.create({
      query: q,
      count: counter,
      next_id: nextMaxId,
      searchId,
      dataType: 'wordcloud',
    });

  } else {

    counter = 500;
  }
  return Promise.all([counter, nextMaxId]);
};

// fetchTweets: fetch tweets on a loop until you have sufficient data stored in db
const fetchTweets = async (q, total, lastSearchId, searchType) => {
  const searchId = lastSearchId ? ++lastSearchId : 1;

  let metadata = await getTweets(q, 100, searchId, searchType);
  let recordCount = metadata[0];
  let max_id = metadata[1];

  while (recordCount < total) {
    metadata = await getTweets(q, 100, searchId, searchType, max_id);
    recordCount += metadata[0];
    max_id = metadata[1];
  }

  return searchId;
};

module.exports = {
  fetchTweets,
  getTweets,
};
