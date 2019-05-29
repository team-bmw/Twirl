
/* eslint-disable handle-callback-err */
/* eslint-disable camelcase */

// Use search/tweets endpoint on loop to fetch tweets
const Twitter = require('twitter');

const { consumer_key, consumer_secret, access_token_key, access_token_secret } = require('./login');
const { db, Tweet, Metadata } = require('../../server/db/index');

// Change out keys here:
const client = new Twitter({
    consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret,
});

// sync database, deleting previous results
db.sync({ force: true })
    .then(() => console.log('Database synced'));

// parse "next_results" string from search_metadata to get max_id term for next search
const getNextMaxId = str => {
    const terms = str.replace('?', '').split('&');
    const maxIdTerm = terms.find(term => term.includes('max_id'));
    return maxIdTerm ? maxIdTerm.split('=')[1] : null;
}

// get next set of tweets and save to database (also save metadata)
const getTweets = (q, count, max_id = null) => {

    return client.get('search/tweets', { q, count, max_id, lang: 'en', tweet_mode: 'extended' })
        .then(tweets => {
            let counter = 0;
            let nextMaxId = getNextMaxId(tweets.search_metadata.next_results);
            tweets.statuses.forEach(element => {
                ++counter;
                Tweet.create({ query: q, text: element.full_text, twitterId: `${element.id}` });
            });
            Metadata.create({ query: q, count: counter, next_id: nextMaxId })
            return Promise.all([counter, nextMaxId]);
        })
};

// keep fetching tweets until reach total required number of tweets
const fetchTweets = async (q, total) => {

    let metadata = await getTweets(q, 100);

    let recordCount = metadata[0];
    let max_id = metadata[1];

    while (recordCount < total) {
        metadata = await getTweets(q, 100, max_id);
        recordCount += metadata[0];
        max_id = metadata[1];
    }

};

fetchTweets('trump', 20);

