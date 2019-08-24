import { any, arrayOf, string } from 'prop-types';
import React, { useEffect, useState } from 'react';

import GoogleAuthContext from './GoogleAuthContext';

/**
 * @function GoogleAuthProvider Provide OAuth 2.0 authorization to access Google APIs cf. https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps
 */
export default function GoogleAuthProvider({ apiKey, children, clientId, scope, discoveryDocs }) {
  const [{ googleAuth, initialized }, setState] = useState({
    googleAuth: null,
    initialized: false,
  });

  useEffect(() => {
    if (!window.gapi)
      throw new Error(
        'The API is not available, you probably forgot to add the script https://apis.google.com/js/platform.js in the <head>.',
      );

    window.gapi.load('client', () => {
      window.gapi.client
        .init({
          apiKey,
          clientId,
          scope,
          discoveryDocs,
        })
        .then(() => {
          const googleAuthInstance = window.gapi.auth2.getAuthInstance();

          // Listen for sign-in state changes.
          googleAuthInstance.isSignedIn.listen(isSignedIn => {
            console.log(isSignedIn);
          });

          setState({
            googleAuth: googleAuthInstance,
            initialized: true,
          });
        });
    });

    return () => {
      setState({ googleAuth: null, initialized: false });
    };
  }, [apiKey, clientId, scope, discoveryDocs]);

  return (
    <GoogleAuthContext.Provider value={{ googleAuth, initialized }}>{children}</GoogleAuthContext.Provider>
  );
}

GoogleAuthProvider.propTypes = {
  apiKey: string.isRequired,
  children: any,
  clientId: string.isRequired,
  scope: string.isRequired,
  discoveryDocs: arrayOf(string),
};

GoogleAuthProvider.defaultProps = {
  children: null,
  discoveryDocs: [],
};
