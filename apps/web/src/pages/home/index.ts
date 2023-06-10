import { createRouteView } from 'atomic-router-react';

import { PageLoader } from '@mg-control/web/shared/ui';
import { HomeLayout } from '@mg-control/web/widgets/layouts';

import { anonymousHomePageRoute, homePageRoute } from './model';
import { HomePage } from './ui';

export const HomeRoute = {
  view: createRouteView({ route: anonymousHomePageRoute, view: HomePage, otherwise: PageLoader }),
  route: homePageRoute,
  layout: HomeLayout,
};
