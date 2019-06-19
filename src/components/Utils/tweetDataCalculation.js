export const getSentimentAverageFromTweetData = tweetData => {
  const sentimentSum = tweetData.reduce((sum, { sentiment }) => {
    sum += sentiment;
    return sum;
  }, 0);
  return sentimentSum / tweetData.length;
};
