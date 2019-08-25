import { useContext } from 'react';

import GoogleAuthContext from './GoogleAuthContext';

export default function useGoogleAuth() {
  const { initialized, googleAuth, isAuthorized } = useContext(GoogleAuthContext);
  return Object.assign([googleAuth, initialized, isAuthorized], { initialized, googleAuth, isAuthorized });
}
