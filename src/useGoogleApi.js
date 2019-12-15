import { useContext } from 'react';

import GoogleApiContext from './GoogleApiContext';

export default function useGoogleApi() {
  const { auth, client, error, loading, user } = useContext(GoogleApiContext);

  return Object.assign([auth, client, error, loading, user], {
    auth,
    client,
    error,
    loading,
    user,
  });
}
