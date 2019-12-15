import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import GoogleIcon from './GoogleIcon';
import Title from './Title';
import useGoogleApi from './useGoogleApi';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
  },
  title: {
    padding: theme.spacing(4),
  },
  link: {
    textDecoration: 'none',
  },
}));

export default function Login() {
  const {
    auth,
    user: { authorized },
  } = useGoogleApi();
  const classes = useStyles();

  if (authorized) return <Redirect to="/" />;

  function logIn() {
    if (auth) auth.signIn();
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.container}>
      <Grid item className={classes.title} component="h1">
        <Title />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={logIn} startIcon={<GoogleIcon />}>
          Log-in with Google
        </Button>
      </Grid>
    </Grid>
  );
}
