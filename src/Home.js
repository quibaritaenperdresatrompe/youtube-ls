import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import React from 'react';
import MySubscriptions from './MySubscriptions';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <MySubscriptions />
    </Container>
  );
}
