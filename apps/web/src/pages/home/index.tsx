import { reflect } from '@effector/reflect';
import { createRouteView } from 'atomic-router-react';

import { routes } from '@mg-control/web/shared/routing';
import { HomeLayout } from '@mg-control/web/widgets/layouts';

import { HomePageView } from './ui';

const HomePage = reflect({
  view: HomePageView,
  bind: {},
});

export const HomeRoute = {
  view: createRouteView({ route: routes.home, view: () => <HomePage /> }),
  route: routes.home,
  layout: HomeLayout,
};
