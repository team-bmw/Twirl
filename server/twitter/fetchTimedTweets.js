
// Purpose: Fetch stratified sample of tweets from the past 7 days

const { db, Tweet, Metadata } = require('../db/index');
const { scoreTweetSentiment } = require('./classifyTweets');
const { createQueryString, getNextMaxId, subtractDays } = require('./helperFunctions');

const client = require('./twitterSetup');

// getTimedTweets: get a sample of 100 tweets, created between startDate and endDate
const getTimedTweets = async (q, count, search_id, searchType, startDate, endDate = null, max_id = null) => {

    const tweets = await client.get('search/tweets', {
        q: `${createQueryString(q, searchType)} -filter:retweets since:${startDate} ${endDate ? `until:${endDate}` : ``}`,
        count,
        max_id,
        lang: 'en',
        tweet_mode: 'extended',
        result_type: 'mixed',
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
                twitterScreenName: element.user.screen_name,
                twitterDate: element.created_at,
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
            dataType: 'linechart',
        });
    } else {
        counter = 500;
    }
    return Promise.all([counter, nextMaxId]);
}

// fetchTimedTweets: loop through the past 7 days, fetching 100 tweets per day
const fetchTimedTweets = async (q, lastSearchId, searchType) => {

    const search_id = lastSearchId ? ++lastSearchId : 1;

    let startDate = new Date();

    await getTimedTweets(q, 100, search_id, searchType, startDate);

    for (let i = 1; i < 7; i++) {

        let endDate = subtractDays(new Date(startDate), 0);
        startDate = subtractDays(new Date(endDate), 1);

        await getTimedTweets(q, 100, search_id, searchType, startDate, endDate);
    }
    return search_id;
}

module.exports = {
    fetchTimedTweets,
}