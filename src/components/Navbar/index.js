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

import { logOutUser } from '../../reducers/userReducer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit',
  },
  imageIcon: {
    height: 32,
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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
          >
            Twirl
          </Typography>

          {user.id ? (
            <div>
              <Button disabled style={{ color: 'white' }}>
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
                src="Twitter_Logo_WhiteOnImage.svg"
              />
              Login with Twitter
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
