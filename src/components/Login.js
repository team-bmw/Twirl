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
import { LockOutlined } from '@material-ui/icons/';


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
  imageIcon: {
    height: 32,
  }
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
        <Typography variant="h5" gutterBottom>Log In</Typography>
        <Divider />
        
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
                    <img className={classes.imageIcon} src="Twitter_Social_Icon_Circle_Color.svg" />
                  </ListItemIcon>
                  <ListItemText primary="Login with Twitter" />
                </a>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
