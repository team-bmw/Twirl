import React from 'react';
import Typed from 'react-typed';

import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    color: 'white',
    fontSize: '2rem',
    textAlign: 'center',
  },
  typed: {
    color: theme.palette.blue['500'],
  },
}));

const Typing = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        I want to know:{' '}
        <Typed
          strings={[
            '#NewYorkKnicks',
            '#MeToo',
            '#DonaldTrump',
            '#GameOfThrones',
            '#AvengersEndgame',
          ]}
          typeSpeed={60}
          backSpeed={70}
          loop
          className={classes.typed}
        />
      </div>
    </div>
  );
};

export default Typing;
