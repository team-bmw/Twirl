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

const commonProperties = {
  margin: { top: 20, right: 20, bottom: 60, left: 80 },
  animate: true,
  enableSlices: 'x',
};

const MyResponsiveLine = props => {
  // console.log(props);
  const {
    lineChartData: { status, wordData },
  } = props;

  if (status === 'fetched' && wordData.length) {
    return (
      <div style={{ width: '100%', height: '75vh' }}>
        <ResponsiveLine
          {...commonProperties}
          data={wordData}
          xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          precision: 'day',
          useUTC: false,
          }}
          xFormat="time:%Y-%m-%d"
          yScale={{
            type: 'linear',
            stacked: boolean('stacked', false),
          }}
          axisLeft={{
            legend: 'Frequency',
            legendOffset: 0,
            legendPosition: 'middle',
          }}
          axisBottom={{
            format: '%b %d',
            tickValues: 7,
            legend: 'Date',
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
        />
      </div>
    );
  }
  else if (status === 'fetched' && !wordData.length) return <div />;
  else return <Loading />;
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MyResponsiveLine);
