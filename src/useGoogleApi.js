import { useContext } from 'react';

import GoogleApiContext from './GoogleApiContext';

export default function useGoogleApi() {
  const { authorize, client, error, isAuthorized, loading, signOut, user } = useContext(GoogleApiContext);

  return Object.assign([authorize, client, error, isAuthorized, loading, signOut, user], {
    authorize,
    client,
    error,
    isAuthorized,
    loading,
    signOut,
    user,
  });
}
