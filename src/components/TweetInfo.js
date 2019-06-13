import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const TweetInfo = () => {
  const classes = useStyles();

  return (
      <Paper className={classes.root}>
        <Typography variant="h5">
          Followers
        </Typography>
        <Typography variant="h5">
          Retweets
        </Typography>
      </Paper>
  );
}

export default TweetInfo;
