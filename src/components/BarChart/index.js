import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ResponsiveBar } from '@nivo/bar';
import { makeStyles } from '@material-ui/core/styles';
import {
  selectWordElement,
  selectCloudWord,
} from '../../reducers/wordElementReducer';

import WordPopover from '../Search/WordPopover';
import ColorSpectrum from '../Search/ColorSpectrum';
import { getBarChartData } from './utils';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.

const useStyles = makeStyles(theme => ({
  barChart: {
    width: '100%',
    height: '75vh',
  },
}));

const BarChart = ({ wordData, selectWordElement, selectCloudWord }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.barChart}>
        <ResponsiveBar
          enableGridY={false}
          enableGridX={true}
          data={getBarChartData(wordData)}
          keys={['tweets']}
          indexBy="text"
          margin={{ top: 50, right: 50, bottom: 50, left: 100 }}
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
          theme={{
            // background: "#222222",
            axis: {
              fontSize: "1.2rem",
              tickColor: "#b2b2b2",
              ticks: {
                line: {
                  stroke: "#b2b2b2"
                },
                text: {
                  fill: "#ffffff"
                }
              },
              legend: {
                text: {
                  fill: "#ffffff",
                  fontSize: "0.85rem",
                },
              }
            },
            // grid: {
            //   line: {
            //     stroke: "#555555"
            //   }
            // }
          }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          onClick={(node, event) => {
            selectWordElement(event.target);
            selectCloudWord(node.data.cloudWord);
          }}
        />
        <WordPopover />
      </div>
      <div>
        <ColorSpectrum />
      </div>
    </Fragment>
  );
};

export default connect(
  null,
  { selectWordElement, selectCloudWord }
)(BarChart);
