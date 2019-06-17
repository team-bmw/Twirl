import React from 'react';
import { connect } from 'react-redux';
import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@material-ui/styles';
import {
  selectWordElement,
  selectCloudWord,
} from '../../reducers/wordElementReducer';

import WordPopover from '../Search/WordPopover';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.

const BarChart = ({ wordData, selectWordElement, selectCloudWord }) => {
  const theme = useTheme();
  const {
    typography,
    palette: { grey, blue },
  } = theme;

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

  //Helper funcs to format the data for ResponsiveBar
  let barChartDate = wordData
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
  if (barChartDate.length > 39) barChartDate = barChartDate.slice(-40);

  return (
    <div style={{ width: '100%', height: '75vh' }}>
      <ResponsiveBar
        enableGridY={false}
        enableGridX={true}
        data={barChartDate}
        keys={['tweets']}
        indexBy="text"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        layout="horizontal"
        colors={({ data }) => data[`${data.text}Color`]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number of Tweets',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          // legend: 'Words',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color' }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        onClick={(node, event) => {
          selectWordElement(event.target);
          selectCloudWord(node.data.cloudWord);
          // console.log('it has been clicked', node)
        }}
      />

      <WordPopover />
    </div>
  );
};

export default connect(
  null,
  { selectWordElement, selectCloudWord }
)(BarChart);
