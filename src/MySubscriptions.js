import React, { useEffect, useState } from 'react';

import useGoogleApi from './useGoogleApi';
import SingleLineGridList from './SingleLineGridList';

export default function MySubscriptions() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { client, isAuthorized } = useGoogleApi();

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
          console.log(response);

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

  if (!isAuthorized || loading || error) return null;

  return <SingleLineGridList tileData={data} />;
}
