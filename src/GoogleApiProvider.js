import { any, arrayOf, string } from 'prop-types';
import React, { useEffect, useState } from 'react';

import GoogleApiContext from './GoogleApiContext';

function loadScript() {
  if (typeof window.gapi !== 'undefined') {
    return;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.onload = resolve;
    script.onerror = reject;
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);
  });
}

function load() {
  if (window.gapi.client) {
    return;
  }
  return new Promise((resolve, reject) =>
    window.gapi.load('client:auth2', {
      callback: resolve,
      onerror: reject,
    }),
  );
}

/**
 * @function GoogleApiProvider Provide OAuth 2.0 authorization to access Google APIs cf. https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps
 */
export default function GoogleApiProvider({ apiKey, children, clientId, discoveryDocs, scope }) {
  const [{ auth, client, error, isAuthorized, loading, user }, setState] = useState({
    auth: null,
    client: null,
    error: null,
    isAuthorized: false,
    loading: true,
    user: null,
  });

  function authorize() {
    if (auth) {
      auth.signIn();
    }
  }

  function signOut() {
    if (auth) {
      auth.signOut();
    }
  }

  useEffect(() => {
    let cancel = false;

    async function setup() {
      try {
        await loadScript();
        if (cancel) {
          return;
        }

        await load();
        if (cancel) {
          return;
        }

        await window.gapi.client.init({
          apiKey,
          clientId,
          discoveryDocs,
          scope,
        });
        if (cancel) {
          return;
        }
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          loading: false,
          error,
        }));

        return;
      }

      const GoogleAuth = window.gapi.auth2.getAuthInstance();

      function onUpdateSigningStatus() {
        const user = GoogleAuth.currentUser.get();
        const isAuthorized = user.hasGrantedScopes(scope);

        function getUserProfile() {
          if (!isAuthorized) return null;

          const userProfile = user.getBasicProfile();

          return {
            name: userProfile.getName(),
            imageUrl: userProfile.getImageUrl(),
            emailAdress: userProfile.getEmail(),
            token: user.getAuthResponse().id_token,
          };
        }

        setState(prevState => ({
          ...prevState,
          isAuthorized,
          user: getUserProfile(),
        }));
      }

      GoogleAuth.isSignedIn.listen(onUpdateSigningStatus);
      onUpdateSigningStatus();

      setState(prevState => ({
        ...prevState,
        auth: GoogleAuth,
        client: window.gapi.client,
        loading: false,
      }));
    }

    setup();

    return () => {
      cancel = true;
    };
  }, [apiKey, clientId, discoveryDocs, scope]);

  return (
    <GoogleApiContext.Provider value={{ authorize, client, error, isAuthorized, loading, signOut, user }}>
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
