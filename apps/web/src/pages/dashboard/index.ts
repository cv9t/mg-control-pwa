import { createRouteView } from 'atomic-router-react';

import { chainAuthorized } from '@mg-control/web/entities/session';
import { routes } from '@mg-control/web/shared/routing';
import { PageLoader } from '@mg-control/web/shared/ui';
import { DashboardLayout } from '@mg-control/web/widgets/layouts';

import { DashboardPage } from './ui';

export const DashboardRoute = {
  view: createRouteView({
    route: chainAuthorized(routes.dashboard),
    view: DashboardPage,
    otherwise: PageLoader,
  }),
  route: routes.dashboard,
  layout: DashboardLayout,
};
