
// Purpose: Parse tweet data, transforming it into word objects

const WordPOS = require('wordpos');
const wordpos = new WordPOS();

// scrubText: strip out non-alpha-numeric characters
const scrubText = str => {
    return str.replace(/[^a-z ]/gi, '').toLowerCase();
}

// getAdjectivesFromText: return a filtered string containing only adjectives from the input string
const getAdjectivesFromText = async str => {
    const w = await wordpos.getAdjectives(str)
        .then(words => words.join(' '));
    return w;
};

// getNounsFromText: return a filtered string containing only nouns from the input string
const getNounsFromText = str => {
    return wordpos.getNouns(str)
        .then(words => words.join(' '));
};

// filterWords: filter words for wordCloudd
const filterWords = word => {
    return !(word.length < 3 || word.length > 15)
}

// tweetsToWordFrequencies: turn array of Tweet objects into word frequency objects
const tweetsToWordFrequencies = (tweets, threshold = 5) => {

    const freqObj = tweets.reduce((freq, tweet) => {

        const newTweetData = {
            twitterId: tweet.twitterId,
            twitterUserId: tweet.twitterUserId,
            isRetweet: tweet.isRetweet,
            userVerified: tweet.userVerified,
            numRetweets: tweet.numRetweets,
            numFavorities: tweet.numFavorities,
            numFriends: tweet.numFriends,
            numFollowers: tweet.numFollowers,
            sentiment: tweet.sentiment,
            location: tweet.location,
            twitterScreenName: tweet.twitterScreenName,
            twitterDate: tweet.twitterDate,
        };

        const words = scrubText(tweet.text).split(' ');

        return words.reduce((tweetFreq, word) => {
            if (tweetFreq[word]) {
                ++tweetFreq[word].value;
                tweetFreq[word].tweetData.push(newTweetData);
            } else {
                tweetFreq[word] = {
                    text: word,
                    value: 1,
                    tweetData: [newTweetData],
                };
            }
            return tweetFreq;
        }, freq);
    }, {});

    return Object.keys(freqObj).reduce((arr, word) => {

        if (freqObj[word].value > threshold && filterWords(word)) {
            arr.push(freqObj[word]);
        }

        return arr;
    }, []);
};

// adjectivesToWordFrequencies: turn array of Tweet objects into word frequency objects, keeping only adjectives
const adjectivesToWordFrequencies = async (tweets, query) => {
    const adjTweets = [];
    for (let i = 0; i < tweets.length; i++) {
        const adj = await getAdjectivesFromText(tweets[i].text);
        if (adj.length) {
            tweets[i].text = adj;
            adjTweets.push(tweets[i]);
        }
    }
    return tweetsToWordFrequencies(adjTweets)//.filter(adj => !query.split(' ').includes(adj.text));
}

// nounsToWordFrequencies: turn array of Tweet objects into word frequency objects, keeping only nouns
const nounsToWordFrequencies = async (tweets, query) => {
    const nounTweets = [];
    for (let i = 0; i < tweets.length; i++) {
        const noun = await getNounsFromText(tweets[i].text);
        if (noun.length) {
            tweets[i].text = noun;
            nounTweets.push(tweets[i]);
        }
    }
    return tweetsToWordFrequencies(nounTweets).filter(noun => !query.split(' ').includes(noun.text));
}

module.exports = {
    tweetsToWordFrequencies,
    adjectivesToWordFrequencies,
    nounsToWordFrequencies,
}
