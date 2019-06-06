import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    // background: theme.palette.grey[50],
    background: theme.palette.secondary.contrastText,
    color: theme.palette.text.primary,
  },
}));

function PositionedSnackbar({ message }) {
  const classes = useStyles();
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={true}
        ContentProps={{
          classes: { root: classes.root },
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
      />
    </div>
  );
}

export default PositionedSnackbar;
