import { Redirect } from 'react-router-dom';
import React, { Suspense } from 'react';

import useGoogleAuth from './useGoogleAuth';

export default function SecuredRoute({ component: Component, ...props }) {
  const { isAuthorized } = useGoogleAuth();

  return (
    <Suspense fallback={null}>{isAuthorized ? <Component {...props} /> : <Redirect to="/login" />}</Suspense>
  );
}
