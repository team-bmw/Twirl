import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import {
  Menu,
  MenuItem,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Button,
  Avatar,
} from '@material-ui/core';

import Search from './Search';
import { logOutUser } from '../../reducers/userReducer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    textDecoration: 'none',
    color: 'inherit',
  },
  search: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    height: 32,
  },
  login: {
    display: 'none',
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    },
  },
  name: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    },
  },
}));

function MenuAppBar({ logOutUser, user }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
          >
            Twirl
          </Typography>

          <div className={classes.search}>
            <Search />
          </div>

          {user.id ? (
            <div>
              <Button
                disabled
                style={{ color: 'white' }}
                className={classes.name}
              >
                {user.twitterDisplayName}
              </Button>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <Avatar alt={user.twitterDisplayName} src={user.twitterPhoto} />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logOutUser();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" href="/auth/twitter">
              <img
                className={classes.imageIcon}
                src="/Twitter_Logo_WhiteOnImage.svg"
              />
              <span className={classes.login}>Login</span>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOutUser: () => dispatch(logOutUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuAppBar);
