import React from 'react';
import { connect } from 'react-redux';

import { useTheme } from '@material-ui/styles';
import { ResponsiveWaffle } from '@nivo/waffle';

import { updateSelectedTweets } from '../../reducers/tweetsReducer';

const MyResponsiveWaffle = ({ wordData, updateSelectedTweets }) => {
  const theme = useTheme();
  const {
    palette: { grey, blue },
  } = theme;

  const getWaffleDataFromwordData = wordData => {
    const output = [
      {
        id: 'Very Positive',
        label: 'Most Positive',
        value: 0,
        tweetData: [],
        color: grey['50'],
      },
      {
        id: 'Positive',
        label: 'Positive',
        value: 0,
        tweetData: [],
        color: blue['100'],
      },
      {
        id: 'Netural',
        label: 'Netural',
        value: 0,
        tweetData: [],
        color: blue['300'],
      },
      {
        id: 'Negative',
        label: 'Negative',
        value: 0,
        tweetData: [],
        color: blue['700'],
      },
      {
        id: 'Very Negative',
        label: 'Very Negative',
        value: 0,
        tweetData: [],
        color: blue['900'],
      },
    ];

    wordData.forEach(({ tweetData }) => {
      tweetData.forEach(tweet => {
        const { sentiment } = tweet;
        let elem;
        if (sentiment > 3) elem = output[0];
        else if (sentiment > 1) elem = output[1];
        else if (sentiment > 0) elem = output[2];
        else if (sentiment > -1) elem = output[3];
        else elem = output[4];

        elem.value++;
        elem.tweetData.push(tweet);
      });
    });

    return output;
  };

  const getFlattenedWaffleDataLength = waffleData => {
    return waffleData.reduce((sum, { value }) => {
      sum += value;
      return sum;
    }, 0);
  };

  const waffleData = getWaffleDataFromwordData(wordData);
  const waffleDataLength = getFlattenedWaffleDataLength(waffleData);

  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <ResponsiveWaffle
        data={waffleData}
        total={waffleDataLength}
        rows={18}
        onClick={elem => {
          const {
            data: { tweetData },
          } = elem;
          updateSelectedTweets(tweetData);
        }}
        columns={14}
        margin={{ top: 10, right: 10, bottom: 10, left: 120 }}
        colors={{
          scheme: 'blues',
        }}
        // borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={11}
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            justify: false,
            translateX: -100,
            translateY: 0,
            itemsSpacing: 4,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            itemTextColor: '#777',
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                  itemBackground: '#f7fafb',
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default connect(
  null,
  { updateSelectedTweets }
)(MyResponsiveWaffle);
