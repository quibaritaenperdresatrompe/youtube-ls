import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import GoogleApiProvider from './GoogleApiProvider';
import Login from './Login';
import React, { lazy } from 'react';
import SecuredRoute from './SecuredRoute';

const Header = lazy(() => import('./Header'));
const Home = lazy(() => import('./Home'));

function App() {
  return (
    <GoogleApiProvider
      apiKey={process.env.REACT_APP_YOUTUBE_DATA_API_KEY}
      clientId={process.env.REACT_APP_GOOGLE_SIGN_IN_CLIENT_ID}
      discoveryDocs={['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']}
      scope={'https://www.googleapis.com/auth/youtube.readonly'}
    >
      <BrowserRouter>
        <SecuredRoute path="/" component={Header} />
        <Container>
          <Switch>
            <SecuredRoute path="/" exact component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleApiProvider>
  );
}
export default App;
