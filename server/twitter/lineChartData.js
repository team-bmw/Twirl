const { adjectivesToWordFrequencies } = require('./parseTweets');

// Helper func to pad the month and date with 0 and change order to YYYY/MM/DD
const padAndFormatDate = (date) => {
  const padZero = (dateSegment) => {
    return `0${dateSegment}`.slice(-2);
  }
  const dateArr = date.split('-');
  const paddedDate = `${dateArr[2]}-${padZero(dateArr[0])}-${padZero(dateArr[1])}`;
  return paddedDate;
}

const tweetsToLineChartData = async(tweets, query) => {
  const wordFreq = await adjectivesToWordFrequencies(tweets, query);
  return wordFreq.map(word => {
    const dateCount = word.tweetData.reduce((acc, tweet) => {
      const dateString = new Date(`${tweet.twitterDate}`).toLocaleDateString().split('/').join('-');
      if (acc[dateString]) {
        ++acc[dateString];
      }
      else {
        acc[dateString] = 1;
      }

      return acc;
    }, {})

    return {
      id: word.text,
      data: Object.keys(dateCount)
      .map(date => {
        return {
          x: padAndFormatDate(date),
          y: dateCount[date],
        }
      })
      .sort((a, b) => {
        return parseInt(a.x.split('-').join('')) - parseInt(b.x.split('-').join(''))
      })
    }
  });
}

module.exports = {
  tweetsToLineChartData,
}
