/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createRouteView } from 'atomic-router-react';

import { Loader } from '@mg-control/web/shared/ui';
import { DashboardLayout } from '@mg-control/web/widgets/layouts';

import * as model from './model';
import { DashboardPage } from './page';

export const DashboardRoute = {
  view: createRouteView({
    route: model.authorizedRoute,
    // @ts-ignore
    view: createRouteView({
      route: model.deviceConnectedRoute,
      view: DashboardPage,
      otherwise: () => <Loader.Page title="Connecting to device" />,
    }),
    otherwise: Loader.Auth,
  }),
  route: model.currentRoute,
  layout: DashboardLayout,
};
