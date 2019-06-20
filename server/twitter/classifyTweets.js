
const speak = require('speakeasy-nlp');
const { SentimentAnalyzer } = require('node-nlp');
const sentiment = new SentimentAnalyzer({ language: 'en' });


const scoreTweetSentiment = tweet => {
    return sentiment.getSentiment(tweet).score;
}

// const scoreTweetSentiment = tweet => {
//     const wordCount = tweet.split(' ').length;
//     return (speak.sentiment.positivity(tweet).score - speak.sentiment.negativity(tweet).score) / wordCount;
// }

module.exports = {
    scoreTweetSentiment,
}
