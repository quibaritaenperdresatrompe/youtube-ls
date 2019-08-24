import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Popover from '@material-ui/core/Popover';
import React, { Fragment, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import useGoogleAuth from './useGoogleAuth';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
  },
  username: {
    fontWeight: 700,
  },
  userInfo: {
    padding: theme.spacing(2) * 0.5, // Workaround to avoid overflow due to Grid spacing, cf. https://material-ui.com/fr/components/grid/#marge-n%C3%A9gative
  },
}));

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
  const userEmailAdress = currentUser.getEmail();

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
      </Button>
      <Popover
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={open}
        onClose={handleClose}
        PaperProps={{ square: true }}
        className={classes.menu}
      >
        <div className={classes.userInfo}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt={userName} src={userImageUrl} className={classes.avatar} />
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography className={classes.username}>{userName}</Typography>
                </Grid>
                <Grid item>
                  <Typography>{userEmailAdress}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <MenuList>
          <MenuItem onClick={onLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <Typography variant="inherit">Logout</Typography>
          </MenuItem>
        </MenuList>
      </Popover>
    </Fragment>
  );
}
