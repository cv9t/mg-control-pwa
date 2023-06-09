import { routes } from '@mg-control/web/shared/routing';
import { Route } from '@mg-control/web/shared/types';
import { HomeLayout } from '@mg-control/web/widgets/layouts';

import { HomePage } from './ui';

export const HomeRoute: Route = {
  view: HomePage,
  route: routes.home,
  layout: HomeLayout,
};
