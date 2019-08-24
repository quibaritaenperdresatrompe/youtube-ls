import { useContext } from 'react';

import GoogleAuthContext from './GoogleAuthContext';

export default function useGoogleAuth() {
  const { initialized, googleAuth } = useContext(GoogleAuthContext);
  return Object.assign([googleAuth, initialized], { initialized, googleAuth });
}
