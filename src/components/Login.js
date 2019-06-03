import React from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from '@material-ui/core/';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Inbox, LockOutlined } from '@material-ui/icons/';
import {loginWithTwitter} from '../reducers/userReducer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100vw',
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
    width: 400,
    height: 400,
  },
  list: {
    width: '100%',
  },
}));

const Login = ({loginWithTwitter}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Paper className={classes.paper} align="center">
        <LockOutlined fontSize="large" />
        <Typography variant="h5">Log In</Typography>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ width: '100%', height: '70%' }}
        >
          <Grid item sm={12}>
            <List component="nav" className={classes.list}>
              <ListItem button onClick={loginWithTwitter}>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Login with Twitter" />
              </ListItem>
              <Divider />
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    loginWithTwitter: () => dispatch(loginWithTwitter()),
  }
}

export default connect(null, mapDispatchToProps)(Login);
