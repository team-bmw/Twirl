import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '70%',
    height: theme.spacing(3),
    marginBottom: theme.spacing(2),
    alignItems: 'center',
  },
  worst: {
    backgroundColor: theme.palette.blue['900'],
    height: '100%',
    width: '20%',
  },
  bad: {
    backgroundColor: theme.palette.blue['700'],
    height: '100%',
    width: '20%',
  },
  normal: {
    backgroundColor: theme.palette.blue['300'],
    height: '100%',
    width: '20%',
  },
  good: {
    backgroundColor: theme.palette.blue['100'],
    height: '100%',
    width: '20%',
  },
  best: {
    backgroundColor: theme.palette.grey['50'],
    height: '100%',
    width: '20%',
  },
  text: {
    color: theme.palette.grey['50'],
  },
}));

const ColorSpectrum = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.text}>Most Positive</Typography>
      <div className={classes.best} />
      <div className={classes.good} />
      <div className={classes.normal} />
      <div className={classes.bad} />
      <div className={classes.worst} />
      <Typography className={classes.text}>Most Negative</Typography>
    </div>
  );
};

export default ColorSpectrum;
