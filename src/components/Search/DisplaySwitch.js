import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const DisplaySwitch = ({ chartType, setChartType }) => {
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
          setChartType('linechart');
        }}
      >
        Linechart
      </Button>
    </div>
  );
};

export default DisplaySwitch;
