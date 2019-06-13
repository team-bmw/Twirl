import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 0),
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(2),
  },
  info: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  count: {
    color: theme.palette.primary.main,
    fontWeight: 500,
  }
}));

const TweetInfo = ({followers, retweets}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.info}>
        <Typography variant="body2" align="center">
          Followers <span className={classes.count}>{followers}</span>
        </Typography>
        <Typography variant="body2" align="center">
          Retweets <span className={classes.count}>{retweets}</span>
        </Typography>
      </div>
    </Paper>
  );
}

export default TweetInfo;
