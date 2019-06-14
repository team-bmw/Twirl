import React, { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Popover, Typography } from '@material-ui/core';

import { updateSelectedTweets } from '../../reducers/tweetsReducer';
import { selectedWordElement } from '../../reducers/wordElementReducer';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const WordPopover = ({ wordElement, selectedWordElement }) => {
  const classes = useStyles();

  const handleClose = () => {
    selectedWordElement(null);
  }

  const open = Boolean(wordElement);
  const id = open ? 'options-popover' : null;

  return (
      <Popover
        id={id}
        open={open}
        anchorEl={wordElement}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>The content of the Popover.</Typography>
      </Popover>
  );
};

const mapStateToProps = ({ wordElement }) => {
  return {
    wordElement,
  }
};



export default connect(
  mapStateToProps, { updateSelectedTweets, selectedWordElement }
)(WordPopover);
