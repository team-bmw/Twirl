import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import { selectSearchId } from '../../reducers/searchesReducer';
import { emptySelectedTweets } from '../../reducers/tweetsReducer';
import { updateChartType } from '../../reducers/chartTypeReducer';
import { select } from 'd3';

const DisplaySwitch = ({
  chartType,
  setChartType,
  searches,
  selectSearchId,
  emptySelectedTweets,
  updateChartType,
}) => {
  const useStyles = makeStyles(theme => ({
    selectedButton: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.grey['50'],
      color: theme.palette.blue['500'],
    },
    notSelectedButton: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.blue['500'],
      color: theme.palette.grey['50'],
    },
  }));

  const classes = useStyles();
  const currentSearch = searches.wordCloudSearches.concat(searches.lineChartSearches).find(s => searches.searchId === s.searchId);
  const query = currentSearch ? currentSearch.query : null;

  const sortSearches = searches => {
    return searches.sort((s1, s2) => {
      return s2.searchId - s1.searchId;
    })
  }

  const getNextSearchId = (q, chart) => {
    if (chart === 'wordcloud') {
      return sortSearches(searches.wordCloudSearches).find(s => s.query === q).searchId;
    }
    return sortSearches(searches.lineChartSearches).find(s => s.query === q).searchId;
  }

  return (
    <div>
      <Button
        variant="contained"
        className={
          chartType === 'wordcloud'
            ? classes.selectedButton
            : classes.notSelectedButton
        }
        onClick={() => {
          updateChartType('wordcloud');
          selectSearchId(getNextSearchId(query, 'wordcloud'));
          emptySelectedTweets();
          setChartType('wordcloud');
        }}
      >
        Wordcloud
      </Button>
      <Button
        variant="contained"
        className={
          chartType === 'barchart'
            ? classes.selectedButton
            : classes.notSelectedButton
        }
        onClick={() => {
          updateChartType('wordcloud');
          selectSearchId(getNextSearchId(query, 'wordcloud'));
          emptySelectedTweets();
          setChartType('barchart');
        }}
      >
        Barchart
      </Button>
      <Button
        variant="contained"
        className={
          chartType === 'waffle'
            ? classes.selectedButton
            : classes.notSelectedButton
        }
        onClick={() => {
          updateChartType('wordcloud');
          selectSearchId(getNextSearchId(query, 'wordcloud'));
          emptySelectedTweets();
          setChartType('waffle');
        }}
      >
        Waffle
      </Button>
      <Button
        variant="contained"
        className={
          chartType === 'linechart'
            ? classes.selectedButton
            : classes.notSelectedButton
        }
        onClick={() => {
          updateChartType('linechart');
          selectSearchId(getNextSearchId(query, 'linechart'));
          emptySelectedTweets();
          setChartType('linechart');
        }}
      >
        Linechart
      </Button>
    </div>
  );
};

const mapStateToProps = ({ searches }) => {
  return {
    searches,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectSearchId: searchId => dispatch(selectSearchId(searchId)),
    emptySelectedTweets: () => dispatch(emptySelectedTweets()),
    updateChartType: chartType => dispatch(updateChartType(chartType)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisplaySwitch);
