import { createRouteView } from 'atomic-router-react';

import { chainAnonymous } from '@mg-control/web/entities/session';
import { routes } from '@mg-control/web/shared/routing';
import { PageLoader } from '@mg-control/web/shared/ui';
import { HomeLayout } from '@mg-control/web/widgets/layouts';

import { ActivationPage } from './ui';

export const ActivationRoute = {
  view: createRouteView({
    route: chainAnonymous(routes.auth.activation),
    view: ActivationPage,
    otherwise: PageLoader,
  }),
  route: routes.auth.activation,
  layout: HomeLayout,
};
