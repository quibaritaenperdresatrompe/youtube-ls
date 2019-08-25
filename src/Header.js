import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Title from './Title';
import useGoogleAuth from './useGoogleAuth';
import UserProfile from './UserProfile';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const { isAuthorized } = useGoogleAuth();
  const classes = useStyles();

  if (!isAuthorized) return null;

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <Title />
        </Typography>
        <UserProfile />
      </Toolbar>
    </AppBar>
  );
}
