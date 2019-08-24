import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { Fragment, useState } from 'react';

import useGoogleAuth from './useGoogleAuth';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
});

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { googleAuth, initialized } = useGoogleAuth();
  const classes = useStyles();

  const onLogin = () => {
    googleAuth.signIn();
  };

  const onLogout = () => {
    googleAuth.signOut();
    setAnchorEl(null);
  };

  if (!initialized) return null;

  const isSignedIn = googleAuth.isSignedIn.get();

  if (!isSignedIn)
    return (
      <Button color="inherit" onClick={onLogin}>
        Login
      </Button>
    );

  const currentUser = googleAuth.currentUser.get().getBasicProfile();
  const userName = currentUser.getName();
  const userImageUrl = currentUser.getImageUrl();

  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Fragment>
      <Button
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar alt={userName} src={userImageUrl} className={classes.avatar} />
        <Typography variant="button">{userName}</Typography>
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </Fragment>
  );
}
