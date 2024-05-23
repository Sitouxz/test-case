import React from 'react';
import PathConstants from './pathConstants';

const PageHome = React.lazy(() => import('../pages/PageLanding/PageLanding'));
const PageDetails = React.lazy(
  () => import('../pages/PageDetails/PageDetails')
);
const PageAbout = React.lazy(() => import('../pages/PageAbout/PageAbout'));

const routes = [
  { path: PathConstants.HOME, element: <PageHome /> },
  { path: PathConstants.DETAILS, element: <PageDetails /> },
  { path: PathConstants.ABOUT, element: <PageAbout /> }
];

export default routes;
