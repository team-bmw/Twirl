import React, { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Typography } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(2),
    display: 'flex',
  },
  input: {
    width: '100%',
  },
  form: {
    width: '100%',
  },
}));

const TweetResponder = ({ twitterScreenName, twitterId }) => {
  const classes = useStyles();

  const [responseText, setResponseText] = useState('');

  const handleInputChange = evt => {
    setResponseText(evt.target.value);
  };

  const handleFormSubmit = evt => {
    if (responseText) {
      evt.preventDefault();
      console.log(responseText);
      axios
        .post('/api/tweet/', {
          tweetId: twitterId,
          responseText,
          authorNameOfTweetToRespond: twitterScreenName,
        })
        .then(() => {
          console.log('tweet succeeded!');
          setResponseText('');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleFormSubmit} className={classes.form}>
        <InputBase
          value={responseText}
          onChange={handleInputChange}
          className={classes.input}
          placeholder={`Reply to @${twitterScreenName}`}
        />
      </form>
    </Paper>
  );
};

export default TweetResponder;
