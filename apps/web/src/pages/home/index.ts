import { createRouteView } from 'atomic-router-react';

import { sessionModel } from '@mg-control/web/entities/session';
import { routes } from '@mg-control/web/shared/routing';
import { Loader } from '@mg-control/web/shared/ui';
import { HomeLayout } from '@mg-control/web/widgets/layouts';

import { HomePage } from './page';

const currentRoute = routes.home;
const anonymousRoute = sessionModel.chainAnonymous(currentRoute);

export const HomeRoute = {
  view: createRouteView({
    route: anonymousRoute,
    view: HomePage,
    otherwise: Loader.Auth,
  }),
  route: currentRoute,
  layout: HomeLayout,
};
