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

import useGoogleApi from './useGoogleApi';

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

export default function UserProfile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { auth, loading, user } = useGoogleApi();
  const classes = useStyles();

  if (loading) return null;

  function logIn() {
    if (auth) auth.signIn();
  }

  if (!user.authorized)
    return (
      <Button color="inherit" onClick={logIn}>
        Log-in
      </Button>
    );

  const { name, emailAdress, imageUrl } = user;
  const avatar = <Avatar alt={name} src={imageUrl} className={classes.avatar} />;
  const open = Boolean(anchorEl);

  function logOut() {
    setAnchorEl(null);
    if (auth) auth.signOut();
  }

  function onOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function onClose() {
    setAnchorEl(null);
  }

  return (
    <Fragment>
      <Button
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={onOpen}
        color="inherit"
      >
        {avatar}
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
        onClose={onClose}
        PaperProps={{ square: true }}
        className={classes.menu}
      >
        <div className={classes.userInfo}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>{avatar}</Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography className={classes.username}>{name}</Typography>
                </Grid>
                <Grid item>
                  <Typography>{emailAdress}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <MenuList>
          <MenuItem onClick={logOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <Typography variant="inherit">Log-out</Typography>
          </MenuItem>
        </MenuList>
      </Popover>
    </Fragment>
  );
}
