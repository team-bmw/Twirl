import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { ResponsiveLine } from '@nivo/line';
import Loading from '../Common/Loading';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.

const useStyles = makeStyles(theme => ({
  lineChart: {
    width: '100%',
    height: '75vh',
  },
}));

const LineChartTime = props => {
  const classes = useStyles();
  // console.log(props);
  const {
    lineChartData: { status, wordData },
  } = props;

  if (status === 'fetched' && wordData.length) {
    return (
      <div className={classes.lineChart}>
          <ResponsiveLine
              data={wordData}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{
              type: 'time',
              format: '%Y-%m-%d',
              precision: 'day',
              useUTC: false,
              }}
              xFormat="time:%Y-%m-%d"
              
              yScale={{type: 'linear', stacked: false}}
              axisLeft={{
                legendOffset: -40,
                legend: 'Number of Tweets',
                legendPosition: 'middle',
              }}
              
              // axisLeft={{
              //     orient: 'left',
              //     tickSize: 5,
              //     tickPadding: 5,
              //     tickRotation: 0,
              //     legend: 'Count',
              //     legendOffset: -40,
              //     legendPosition: 'middle'
              // }}
              axisBottom={{
                  format: '%b %d',
                  orient: 'bottom',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Date',
                  legendOffset: 36,
                  legendPosition: 'middle',
                  tickValues: 7,
              }}
              axisTop={null}
              axisRight={null}
              colors={{ scheme: 'nivo' }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                  {
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: 'left-to-right',
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      symbolBorderColor: 'rgba(0, 0, 0, .5)',
                      effects: [
                          {
                              on: 'hover',
                              style: {
                                  itemBackground: 'rgba(0, 0, 0, .03)',
                                  itemOpacity: 1
                              }
                          }
                      ]
                  }
              ]}
          />
    </div>
    )
  }
  else if (status === 'fetched' && !wordData.length) return null;
  else return <Loading />;
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(LineChartTime);
