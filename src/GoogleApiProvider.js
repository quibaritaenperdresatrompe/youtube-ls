import { any, arrayOf, string } from 'prop-types';
import React, { useEffect, useState } from 'react';

import GoogleApiContext from './GoogleApiContext';

function loadScript() {
  return new Promise((resolve, reject) => {
    if (window.gapi) resolve();

    const script = document.createElement('script');
    const url = 'https://apis.google.com/js/api.js';
    script.onload = () => resolve(url);
    script.onerror = () => reject(url);
    script.src = url;
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);
  });
}

function loadClient() {
  return new Promise((resolve, reject) => {
    if (window.gapi.client) {
      resolve();
    }

    window.gapi.load('client:auth2', {
      callback: resolve,
      onerror: reject,
    });
  });
}

function getUserProfile(user, authorized) {
  if (!authorized) return null;

  const userProfile = user.getBasicProfile();

  return {
    name: userProfile.getName(),
    imageUrl: userProfile.getImageUrl(),
    emailAdress: userProfile.getEmail(),
    token: user.getAuthResponse().id_token,
  };
}

function init({ apiKey, clientId, discoveryDocs, scope }) {
  return loadScript()
    .then(loadClient)
    .then(() => {
      window.gapi.client.init({
        apiKey,
        clientId,
        discoveryDocs,
        scope,
      });
    });
}

/**
 * @function GoogleApiProvider Provide OAuth 2.0 authorization to access Google APIs cf. https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps
 */
export default function GoogleApiProvider({ apiKey, children, clientId, discoveryDocs, scope }) {
  const [auth, setAuth] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);

    init({
      apiKey,
      clientId,
      discoveryDocs,
      scope,
    })
      .then(() => {
        const GoogleAuth = window.gapi.auth2.getAuthInstance();

        function onUpdateSigningStatus() {
          const user = GoogleAuth.currentUser.get();
          const authorized = user.hasGrantedScopes(scope);

          setUser(getUserProfile(user, authorized));
          setAuthorized(authorized);
        }

        GoogleAuth.isSignedIn.listen(onUpdateSigningStatus);
        onUpdateSigningStatus();

        setAuth(GoogleAuth);
        setClient(window.gapi.client);
        setLoading(false);
      })
      .catch(error => {
        setAuth(null);
        setAuthorized(false);
        setClient(null);
        setError(error);
        setLoading(false);
        setUser(null);
      });

    return () => {
      setAuth(null);
      setAuthorized(false);
      setClient(null);
      setError(null);
      setLoading(false);
      setUser(null);
    };
  }, [apiKey, clientId, discoveryDocs, scope]);

  return (
    <GoogleApiContext.Provider value={{ auth, client, error, loading, user: { ...user, authorized } }}>
      {children}
    </GoogleApiContext.Provider>
  );
}

GoogleApiProvider.propTypes = {
  apiKey: string.isRequired,
  children: any,
  clientId: string.isRequired,
  discoveryDocs: arrayOf(string),
  scope: string.isRequired,
};

GoogleApiProvider.defaultProps = {
  children: null,
  discoveryDocs: [],
};
