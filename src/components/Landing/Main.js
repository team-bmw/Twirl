import React, { Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import Typing from './Typing';
import Banner from './Banner';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '90vh',
    padding: '3rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  typography: {
    color: theme.palette.grey['50'],
    fontWeight: 'normal',
  },
}));

const Main = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.container}>
          <Typography
            variant="h2"
            className={classes.typography}
            align="center"
          >
            Understand. Manage. Improve
          </Typography>
          <Typing />
        </div>
        <Banner />
      </div>
    </Fragment>
  );
};

export default Main;
