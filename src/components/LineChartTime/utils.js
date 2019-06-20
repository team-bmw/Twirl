export const getTopWords = (wordData = []) => {
  //Helper func to get the total tweets for each word
  const sumTweets = data => {
    return data.reduce((total, dataPoint) => {
      total += dataPoint.y;
      return total;
    }, 0);
  };

  // console.log(wordData);
  //Sort the wordData by the total tweets for the week for each word
  const wordDataSorted = wordData
    .filter(word => word.data)
    .map(({ id, data }) => {
      const totalTweets = sumTweets(data);
      return { id, data, totalTweets };
    })
    .sort((a, b) => a.totalTweets - b.totalTweets);
  // console.log(wordDataSorted)

  // Max of top 10 (for the week) word will be shown in the bar chart
  if (wordDataSorted.length > 9) return wordDataSorted.slice(-10);
  else return wordDataSorted;
};
