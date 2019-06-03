import React from 'react';
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
  link: {
    textDecoration: 'none',
    display: 'flex',
    color: theme.palette.text.primary,
  },
}));

const Login = () => {
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
              <ListItem button>
                <a href="/auth/twitter" className={classes.link}>
                  <ListItemIcon>
                    <Inbox />
                  </ListItemIcon>
                  <ListItemText primary="Login with Twitter" />
                </a>
              </ListItem>
              <Divider />
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
