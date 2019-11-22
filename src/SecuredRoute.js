import { Redirect, Route } from 'react-router-dom';
import React, { Suspense } from 'react';

import useGoogleApi from './useGoogleApi';

export default function SecuredRoute(props) {
  const { isAuthorized } = useGoogleApi();

  return (
    <Suspense fallback={null}>{isAuthorized ? <Route {...props} /> : <Redirect to="/login" />}</Suspense>
  );
}
