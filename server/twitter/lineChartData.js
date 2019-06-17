
const { adjectivesToWordFrequencies } = require('./parseTweets');

const tweetsToLineChartData = async (tweets, query) => {
    const wordFreq = await adjectivesToWordFrequencies(tweets, query);
    return wordFreq.map(word => {
        const dateCount = word.tweetData.reduce((acc, tweet) => {
            const dateString = new Date(`${tweet.twitterDate}`).toLocaleDateString().split('/').join('-');
            if (acc[dateString]) {
                ++acc[dateString];
            } else {
                acc[dateString] = 1;
            }

            return acc;
        }, {})

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

