import { createRoutesView } from 'atomic-router-react';

import { ActivationRoute } from './auth/activation';
import { SignInPageRoute } from './auth/sign-in';
import { DashboardRoute } from './dashboard';
import { HomeRoute } from './home';

export const Pages = createRoutesView({
  routes: [HomeRoute, ActivationRoute, SignInPageRoute, DashboardRoute],
});
