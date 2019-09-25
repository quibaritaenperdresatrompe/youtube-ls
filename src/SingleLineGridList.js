import { arrayOf, shape, string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingBottom: 20,
    paddingTop: 20,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  tile: {
    overflow: 'hidden',
    flexShrink: 0,
  },
}));

export default function SingleLineGridList({ tileData }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={8.5}>
        {tileData.map(({ id, img, title }) => (
          <Grid
            key={id}
            container
            direction="column"
            alignItems="center"
            className={classes.tile}
            component="li"
          >
            <Grid item>
              <Avatar src={img} alt={title} className={classes.avatar} />
            </Grid>
            <Grid item xs>
              <Typography align="center">{title}</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" size="small" color="primary">
                Add
              </Button>
            </Grid>
          </Grid>
        ))}
      </GridList>
    </div>
  );
}

SingleLineGridList.propTypes = {
  tileData: arrayOf(shape({ id: string, title: string, img: string })),
};

SingleLineGridList.defaultProps = {
  tileData: [],
};
