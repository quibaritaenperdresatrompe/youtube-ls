import { Redirect } from 'react-router-dom';
import React, { Suspense } from 'react';

import useGoogleApi from './useGoogleApi';

export default function SecuredRoute({ component: Component, ...props }) {
  const { isAuthorized } = useGoogleApi();

  return (
    <Suspense fallback={null}>{isAuthorized ? <Component {...props} /> : <Redirect to="/login" />}</Suspense>
  );
}
