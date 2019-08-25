import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { lazy } from 'react';

import GoogleAuthProvider from './GoogleAuthProvider';
import Header from './Header';
import Login from './Login';
import SecuredRoute from './SecuredRoute';

const Home = lazy(() => import('./Home'));

function App() {
  return (
    <GoogleAuthProvider
      apiKey={process.env.REACT_APP_YOUTUBE_DATA_API_KEY}
      clientId={process.env.REACT_APP_GOOGLE_SIGN_IN_CLIENT_ID}
      scope="https://www.googleapis.com/auth/youtube.readonly"
    >
      <BrowserRouter>
        <Header />
        <Switch>
          <SecuredRoute path="/" exact component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </GoogleAuthProvider>
  );
}
export default App;
