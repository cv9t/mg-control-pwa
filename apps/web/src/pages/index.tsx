import { createRoutesView } from 'atomic-Router-react';

import { ActivationRoute } from './auth/activation';
import { HomeRoute } from './home';

export const Pages = createRoutesView({
  routes: [HomeRoute, ActivationRoute],
});
