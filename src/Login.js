import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import GoogleIcon from './GoogleIcon';
import Title from './Title';
import useGoogleAuth from './useGoogleAuth';

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

export default function Home() {
  const { googleAuth, isAuthorized } = useGoogleAuth();
  const classes = useStyles();

  if (isAuthorized) return <Redirect to="/" />;

  const onLogin = () => {
    googleAuth.signIn();
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.container}>
      <Grid item>
        <Typography variant="h4" className={classes.title}>
          <Title />
        </Typography>
      </Grid>
      <Grid item>
        {isAuthorized ? (
          <Button variant="contained" color="secondary" component={Link} to="/" className={classes.link}>
            Explore
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={onLogin}>
            <GoogleIcon contrast />
            <Typography variant="button">Log-in with Google</Typography>
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
