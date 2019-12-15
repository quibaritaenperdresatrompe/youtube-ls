import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';

import useGoogleApi from './useGoogleApi';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 60,
    height: 60,
  },
  thumbnail: {
    padding: theme.spacing(2),
  },
  title: {
    fontWeight: 500,
    wordBreak: 'break-word',
  },
}));

export default function MySubscriptions() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const {
    client,
    user: { authorized },
  } = useGoogleApi();

  useEffect(() => {
    setLoading(true);

    client.youtube.subscriptions
      .list({
        part: 'snippet',
        mine: true,
        maxResults: 50,
      })
      .then(
        response => {
          setData(
            response.result.items.map(
              ({
                snippet: {
                  resourceId: { channelId: id },
                  title,
                  thumbnails: {
                    medium: { url: img },
                  },
                },
              }) => ({ id, title, img }),
            ),
          );
          setLoading(false);
        },
        error => {
          setError(error);
          setLoading(false);
        },
      );
  }, [client]);

  if (!authorized || loading || error) return null;

  return (
    <Grid container>
      {data.map(({ id, img, title }) => (
        <Grid
          key={id}
          item
          xs={6}
          sm={3}
          md={2}
          xl={2}
          container
          direction="column"
          alignItems="center"
          className={classes.thumbnail}
          spacing={2}
        >
          <Grid item>
            <Avatar src={img} alt={title} className={classes.avatar} />
          </Grid>
          <Grid item xs>
            <Typography align="center" className={classes.title}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" size="small" color="primary">
              Labelize
            </Button>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
