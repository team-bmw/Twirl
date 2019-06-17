
const { adjectivesToWordFrequencies } = require('./parseTweets');

const tweetsToLineChartData = async (tweets, query) => {
    const wordFreq = await adjectivesToWordFrequencies(tweets, query);
    return wordFreq.map(word => {
        const dateCount = word.tweetData.reduce((acc, tweet) => {
            if (acc[tweet.twitterDate]) {
                ++acc[tweet.twitterDate];
            } else {
                acc[tweet.twitterDate] = 1;
            }

            return acc;
        }, {})

        console.log(dateCount)
        return {
            id: word.text,
            data: Object.keys(dateCount).map(date => {
                return {
                    x: date,
                    y: dateCount[date],
                }
            })
        }
    });
}

module.exports = {
    tweetsToLineChartData,
}

