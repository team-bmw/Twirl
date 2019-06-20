import React from 'react';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '150px',
    backgroundColor: 'white',
    opacity: '0.8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.blue['500'],
    padding: '1rem',
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h6">
        A web-based platform for understanding and interacting with Tweets
      </Typography>
    </div>
  );
};

export default Banner;
