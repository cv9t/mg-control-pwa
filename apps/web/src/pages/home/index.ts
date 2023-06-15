import { createRouteView } from 'atomic-router-react';

import { chainAnonymous } from '@mg-control/web/entities/session';
import { routes } from '@mg-control/web/shared/routing';
import { AuthLoader } from '@mg-control/web/shared/ui';
import { HomeLayout } from '@mg-control/web/widgets/layouts';

import { HomePage } from './ui';

const homeRoute = routes.home;
const anonymousHomeRoute = chainAnonymous(homeRoute);

export const HomeRoute = {
  view: createRouteView({
    route: anonymousHomeRoute,
    view: HomePage,
    otherwise: AuthLoader,
  }),
  route: homeRoute,
  layout: HomeLayout,
};
