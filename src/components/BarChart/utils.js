import {grey, blue} from '@material-ui/core/colors';

//Helper func to get the word sentiment color
const getWordColor = tweetData => {
  const sentimentSum = tweetData.reduce((sum, { sentiment }) => {
    sum += sentiment;
    return sum;
  }, 0);
  const sentimentAverage = sentimentSum / tweetData.length;
  if (sentimentAverage > 0.8) return grey['50'];
  else if (sentimentAverage > 0.6) return blue['100'];
  else if (sentimentAverage > 0.4) return blue['300'];
  else if (sentimentAverage > 0.2) return blue['700'];
  else return blue['900'];
};

//Format the wordData so it can be used by ResponsiveBar comp in BarChart
export const getBarChartData = wordData => {
  const barChartDate = wordData
    .map(wordObj => {
      return {
        text: wordObj.text,
        tweets: wordObj.value,
        [wordObj.text + 'Color']: getWordColor(wordObj.tweetData),
        cloudWord: wordObj,
      };
    })
    .sort((a, b) => a.tweets - b.tweets);

  // Max of top 40 word will be shown in the bar chart
  if (barChartDate.length > 39) return barChartDate.slice(-40);
  else return barChartDate;
};
