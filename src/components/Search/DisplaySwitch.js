import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import { selectSearchId } from '../../reducers/searchesReducer';
import { emptySelectedTweets } from '../../reducers/tweetsReducer';
import { select } from 'd3';

const DisplaySwitch = ({ chartType, setChartType, searches, selectSearchId, emptySelectedTweets }) => {
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
          if (searches.searchId % 2 === 0) selectSearchId(searches.searchId - 1);
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
          if (searches.searchId % 2 === 0) selectSearchId(searches.searchId - 1);
          emptySelectedTweets();
          setChartType('barchart');
        }}
      >
        Barchart
      </Button>
      <Button
        variant="contained"
        className={
          chartType === 'linechart'
            ? classes.selectedButton
            : classes.notSelectedButton
        }
        onClick={() => {
          if (searches.searchId % 2 === 1) selectSearchId(searches.searchId + 1);
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectSearchId: searchId => dispatch(selectSearchId(searchId)),
    emptySelectedTweets: () => dispatch(emptySelectedTweets()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySwitch);
