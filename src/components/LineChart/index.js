import React from 'react';
import { connect } from 'react-redux';

import { ResponsiveLine } from '@nivo/line';
import { boolean, select } from '@storybook/addon-knobs';

import Loading from '../Common/Loading';

const curveOptions = ['linear', 'monotoneX', 'step', 'stepBefore', 'stepAfter'];

const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
  <g>
    <circle
      fill="#fff"
      r={size / 2}
      strokeWidth={borderWidth}
      stroke={borderColor}
    />
    <circle
      r={size / 5}
      strokeWidth={borderWidth}
      stroke={borderColor}
      fill={color}
      fillOpacity={0.35}
    />
  </g>
);

const data = [
  {
    id: 'hours',
    data: [
      { x: 'A', y: '2019-05-29 04:00' },
      { x: 'B', y: '2019-05-29 02:00' },
      { x: 'C', y: '2019-05-29 07:00' },
      { x: 'D', y: '2019-05-30 04:00' },
    ],
  },
];

const data2 = [
  {
    id: 'fake corp. A',
    data: [
      { x: '2018-01-01', y: 7 },
      { x: '2018-01-02', y: 5 },
      { x: '2018-01-03', y: 11 },
      { x: '2018-01-04', y: 9 },
      { x: '2018-01-05', y: 12 },
      { x: '2018-01-06', y: 16 },
      { x: '2018-01-07', y: 13 },
      { x: '2018-01-08', y: 13 },
    ],
  },
  {
    id: 'fake corp. B',
    data: [
      { x: '2018-01-04', y: 14 },
      { x: '2018-01-05', y: 14 },
      { x: '2018-01-06', y: 15 },
      { x: '2018-01-07', y: 11 },
      { x: '2018-01-08', y: 10 },
      { x: '2018-01-09', y: 12 },
      { x: '2018-01-10', y: 9 },
      { x: '2018-01-11', y: 7 },
    ],
  },
];

const theme = {
  axis: {
    textColor: '#eee',
    fontSize: '14px',
    tickColor: '#eee',
  },
};

const commonProperties = {
  margin: { top: 20, right: 20, bottom: 60, left: 80 },
  animate: true,
  enableSlices: 'x',
};

const MyResponsiveLine = props => {
  console.log(props);
  const {
    lineChartData: { status, wordData },
  } = props;

  if (status === 'fetched')
    return (
      <div style={{ width: '100%', height: '75vh' }}>
        <ResponsiveLine
          {...commonProperties}
          data={data2}
          xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            precision: 'day',
          }}
          xFormat="time:%Y-%m-%d"
          yScale={{
            type: 'linear',
            stacked: boolean('stacked', false),
          }}
          axisLeft={{
            legend: 'linear scale',
            legendOffset: -50,
            legendPosition: 'middle',
          }}
          axisBottom={{
            format: '%b %d',
            tickValues: 'every 1 day',
            legend: 'time scale',
            legendOffset: 40,
            legendPosition: 'middle',
          }}
          curve={select('curve', curveOptions, 'monotoneX')}
          enablePointLabel={true}
          pointSymbol={CustomSymbol}
          pointSize={16}
          pointBorderWidth={1}
          pointBorderColor={{
            from: 'color',
            modifiers: [['darker', 0.3]],
          }}
          useMesh={true}
          enableSlices={false}
          theme={theme}
        />
      </div>
    );
  else return <Loading />;
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MyResponsiveLine);
