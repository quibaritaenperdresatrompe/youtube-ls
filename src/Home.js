import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.container}>
      <Grid item>
        <Typography>No results.</Typography>
      </Grid>
    </Grid>
  );
}
