
// TODO: get this working for nouns vs. adjectives

const WordPOS = require('wordpos');
const wordpos = new WordPOS();

// Helper functions to parse tweets

// scrubText: strip out non-alpha-numeric characters
const scrubText = str => {
    return str.replace(/[^a-z0-9 ]/gi, '').toLowerCase();
}

// const getAdjectivesFromText = str => {
//     return wordpos.getAdjectives(str)
//         .then(words => words.join(' '));
// };

// const getNounsFromText = str => {
//     return wordpos.getNouns(str)
//         .then(words => words.join(' '));
// };

// tweetsToString: turn array of Tweet objects into string of tweet text
const tweetsToString = tweets => {
    return tweets.reduce((str, tweet) => {
        str += tweet.text;
        return str;
    }, '');
};

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
        if (freqObj[word].value > 5) {
            arr.push(freqObj[word]);
        }

        return arr;
    }, []);
};

// const adjectivesToWordFrequencies = tweets => {
//     const adjOnlyTweets = tweets.map(async tweet => {
//         try {
//             const adjText = await getAdjectivesFromText(tweet.text);
//             tweet.text = adjText;
//             return tweet;
//         } catch {
//             return tweet;
//         }
//     });

//     return tweetsToWordFrequencies(adjOnlyTweets);
// }

module.exports = {
    tweetsToWordFrequencies,
    tweetsToString,
    // adjectivesToWordFrequencies,
}
