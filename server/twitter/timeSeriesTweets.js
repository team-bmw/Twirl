
const { db, Tweet, Metadata } = require('../db/index');
const { scoreTweetSentiment } = require('./classifyTweets');
const { createQueryString, getNextMaxId } = require('./helperFunctions');

const client = require('./twitterSetup');

const getTimedTweets = async (q, count, search_id, searchType, startTime, endTime, max_id = null) => {

    // const today = new Date();
    const tweets = await client.get('search/tweets', {
        q: `${q} -filter:retweets since:${startTime} until:${endTime}`,
        count,
        max_id,
        lang: 'en',
        tweet_mode: 'extended',
    });

    let counter = 0;
    let nextMaxId = getNextMaxId(tweets.search_metadata.next_results);

    if (nextMaxId > -1) {

        await tweets.statuses.forEach(element => {
            console.log(element.created_at);
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
        });
    } else {
        counter = 500;
    }
    return Promise.all([counter, nextMaxId]);
}

db.sync({ force: true })
getTimedTweets('trump', 10, 100, 'and', '2019-06-14', '2019-06-15');




// const currentDate = today.setDate(today.getDate() - 1);
// console.log(new Date(currentDate).toLocaleDateString());
// }

// const fetchTimedTweets =





// };
