import { createRouteView } from 'atomic-router-react';

import { PageLoader } from '@mg-control/web/shared/ui';

import { authorizedDashboardPageRoute, dashboardPageRoute } from './model';
import { DashboardPage } from './ui';

export const DashboardRoute = {
  view: createRouteView({
    route: authorizedDashboardPageRoute,
    view: DashboardPage,
    otherwise: PageLoader,
  }),
  route: dashboardPageRoute,
};
