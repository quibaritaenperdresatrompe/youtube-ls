import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  title: {
    whiteSpace: 'nowrap',
  },
}));

export default function Title() {
  const classes = useStyles();

  return (
    <code className={classes.title}>
      <strong>$ youtube </strong>
      <span>ls</span>
    </code>
  );
}
