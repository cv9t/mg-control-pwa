import { createRouteView } from 'atomic-router-react';

import { chainAnonymous } from '@mg-control/web/entities/session';
import { routes } from '@mg-control/web/shared/routing';
import { PageLoader } from '@mg-control/web/shared/ui';
import { HomeLayout } from '@mg-control/web/widgets/layouts';

import { HomePage } from './ui';

export const HomeRoute = {
  view: createRouteView({
    route: chainAnonymous(routes.home),
    view: HomePage,
    otherwise: PageLoader,
  }),
  route: routes.home,
  layout: HomeLayout,
};
