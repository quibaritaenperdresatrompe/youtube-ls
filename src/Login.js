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
    fontSize: '5rem',
    padding: theme.spacing(4),
  },
  link: {
    textDecoration: 'none',
  },
}));

export default function Home() {
  const { authorize, isAuthorized } = useGoogleApi();
  const classes = useStyles();

  if (isAuthorized) return <Redirect to="/" />;

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.container}>
      <Grid item className={classes.title}>
        <Title />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={authorize} startIcon={<GoogleIcon />}>
          Log-in with Google
        </Button>
      </Grid>
    </Grid>
  );
}
