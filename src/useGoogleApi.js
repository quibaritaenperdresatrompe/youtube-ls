import { useContext } from 'react';

import GoogleApiContext from './GoogleApiContext';

export default function useGoogleApi() {
  return useContext(GoogleApiContext);
}
