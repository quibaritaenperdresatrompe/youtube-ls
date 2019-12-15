import { Redirect, Route } from 'react-router-dom';
import React, { Suspense } from 'react';

import useGoogleApi from './useGoogleApi';

export default function SecuredRoute(props) {
  const {
    user: { authorized },
  } = useGoogleApi();

  return <Suspense fallback={null}>{authorized ? <Route {...props} /> : <Redirect to="/login" />}</Suspense>;
}
