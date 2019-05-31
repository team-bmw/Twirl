
// Helper functions to parse tweets

const scrubText = str => {
    return str.replace(/[^a-z0-9 ]/gi, '').toLowerCase();
}

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

// wordFrequency: count frequency of words in array of strings
const wordFrequency = tweets => {
    const words = scrubText(tweetsToString(tweets)).split(' ');
    return words.reduce((freq, word) => {
        if (freq[word]) {
            ++freq[word];
        } else {
            freq[word] = 1;
        }
        return freq;
    }, {});
};

module.exports = {
    wordFrequency,
    tweetsToString,
    tweetToText,
    scrubText,
}
