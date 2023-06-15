import { createRouteView } from 'atomic-router-react';

import { AuthLoader } from '@mg-control/web/shared/ui';
import { HomeLayout } from '@mg-control/web/widgets/layouts';

import { activationRoute, anonymousActivationRoute } from './model';
import { ActivationPage } from './ui';

export const ActivationRoute = {
  view: createRouteView({
    route: anonymousActivationRoute,
    view: ActivationPage,
    otherwise: AuthLoader,
  }),
  route: activationRoute,
  layout: HomeLayout,
};
