import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Popover,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import { updateSelectedTweets } from '../../reducers/tweetsReducer';
import { selectWordElement } from '../../reducers/wordElementReducer';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const WordPopover = ({
  wordElement: { selectedDomElement, selectedCloudWord },
  selectWordElement,
  updateSelectedTweets,
}) => {
  const classes = useStyles();

  const handleClose = () => {
    selectWordElement(null);
  };

  const open = Boolean(selectedDomElement);
  const id = open ? 'options-popover' : null;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={selectedDomElement}
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
      <List component="nav" aria-label="Main mailbox folders">
        <ListItem
          button
          onClick={() => {
            updateSelectedTweets(selectedCloudWord.tweetData);
            handleClose();
          }}
        >
          <ListItemText primary="Show Tweets" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Remove Word" />
        </ListItem>
      </List>
    </Popover>
  );
};

const mapStateToProps = ({ wordElement }) => {
  return {
    wordElement,
  };
};

export default connect(
  mapStateToProps,
  { updateSelectedTweets, selectWordElement }
)(WordPopover);
