import React from 'react';

import GoogleAuthProvider from './GoogleAuthProvider';
import Header from './Header';

function App() {
  return (
    <GoogleAuthProvider
      apiKey={process.env.REACT_APP_YOUTUBE_DATA_API_KEY}
      clientId={process.env.REACT_APP_GOOGLE_SIGN_IN_CLIENT_ID}
      scope="https://www.googleapis.com/auth/youtube.readonly"
    >
      <Header />
    </GoogleAuthProvider>
  );
}
export default App;
