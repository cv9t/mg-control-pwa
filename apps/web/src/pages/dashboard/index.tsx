/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createRouteView } from 'atomic-router-react';

import { AuthLoader, PageLoader } from '@mg-control/web/shared/ui';
import { DashboardLayout } from '@mg-control/web/widgets/layouts';

import { authorizedDashboardRoute, dashboardRoute, deviceConnectedRoute } from './model';
import { DashboardPage } from './ui';

export const DashboardRoute = {
  view: createRouteView({
    route: authorizedDashboardRoute,
    // @ts-ignore
    view: createRouteView({
      route: deviceConnectedRoute,
      view: DashboardPage,
      otherwise: () => <PageLoader title="Connecting to device" />,
    }),
    otherwise: AuthLoader,
  }),
  route: dashboardRoute,
  layout: DashboardLayout,
};
