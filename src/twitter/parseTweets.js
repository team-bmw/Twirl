
const { getTweets } = require('./fetchTweets');
const { Tweet } = require('../../server/db/index');

// tweetToText: convert array of tweet objects to array of tweet strings
const tweetToText = tweets => {
    return tweets.map(tweet => tweet.text);
}

// tweetsToString: concatenate tweets into one string
const tweetsToString = tweets => {
    return tweets.reduce((str, tweet) => {
        str += tweet;
        return str;
    }, '');
};

const wordFrequency = tweets => {
    const words = tweetsToString(tweets).split(' ');
    return words.reduce((freq, word) => {
        if (freq[word]) {
            ++freq[word];
        } else {
            freq[word] = 1;
        }
        return freq;
    }, {});
};

const tweetNow = async () => {
    await getTweets('trump', 10);
    const tweet = await Tweet.findAll({
        where: {
            query: 'trump'
        }
    })
    console.log(wordFrequency(tweetToText(tweet)));
}

tweetNow();
