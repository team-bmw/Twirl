
// TODO: get this working for nouns vs. adjectives

const WordPOS = require('wordpos');
const wordpos = new WordPOS();

// Helper functions to parse tweets

// scrubText: strip out non-alpha-numeric characters
const scrubText = str => {
    return str.replace(/[^a-z ]/gi, '').toLowerCase();
}

const getAdjectivesFromText = async str => {
    const w = await wordpos.getAdjectives(str)
        .then(words => words.join(' '));
    return w;
};

const getNounsFromText = str => {
    return wordpos.getNouns(str)
        .then(words => words.join(' '));
};

// tweetsToString: turn array of Tweet objects into string of tweet text
const tweetsToString = tweets => {
    return tweets.reduce((str, tweet) => {
        str += tweet.text;
        return str;
    }, '');
};

const filterWords = word => {
    return !(word.length < 3 || word.length > 15)
}

// tweetsToWordFrequencies: turn array of Tweet objects into word frequency objects
const tweetsToWordFrequencies = tweets => {

    const freqObj = tweets.reduce((freq, tweet) => {

        const id = tweet.twitterId;
        const words = scrubText(tweet.text).split(' ');

        return words.reduce((tweetFreq, word) => {
            if (tweetFreq[word]) {
                ++tweetFreq[word].value;
                tweetFreq[word].ids.push(id);
            } else {
                tweetFreq[word] = {
                    text: word,
                    value: 1,
                    ids: [id],
                };
            }
            return tweetFreq;
        }, freq);
    }, {});

    return Object.keys(freqObj).reduce((arr, word) => {

        // filter: don't want to return everything (filter to 50 most frequent)
        if (freqObj[word].value > 5 && filterWords(word)) {
            arr.push(freqObj[word]);
        }

        return arr;
    }, []);
};

const adjectivesToWordFrequencies = async tweets => {
    const adjTweets = [];
    for (let i = 0; i < tweets.length; i++) {
        const adj = await getAdjectivesFromText(tweets[i].text);
        if (adj.length) {
            tweets[i].text = adj;
            adjTweets.push(tweets[i]);
        }
    }
    return tweetsToWordFrequencies(adjTweets);
}

const nounsToWordFrequencies = async tweets => {
    const nounTweets = [];
    for (let i = 0; i < tweets.length; i++) {
        const adj = await getNounsFromText(tweets[i].text);
        if (adj.length) {
            tweets[i].text = adj;
            nounTweets.push(tweets[i]);
        }
    }
    return tweetsToWordFrequencies(nounTweets);
}

module.exports = {
    tweetsToWordFrequencies,
    tweetsToString,
    adjectivesToWordFrequencies,
    nounsToWordFrequencies,
}
