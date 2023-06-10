import { createRoutesView } from 'atomic-router-react';

import { SignInRoute } from './auth/sign-in';
import { DashboardRoute } from './dashboard';
import { HomeRoute } from './home';

export const Pages = createRoutesView({
  routes: [HomeRoute, SignInRoute, DashboardRoute],
});
