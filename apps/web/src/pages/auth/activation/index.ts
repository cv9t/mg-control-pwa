import { createRouteView } from 'atomic-router-react';

import { Loader } from '@mg-control/web/shared/ui';
import { HomeLayout } from '@mg-control/web/widgets/layouts';

import * as model from './model';
import { ActivationPage } from './page';

export const ActivationRoute = {
  view: createRouteView({
    route: model.anonymousRoute,
    view: ActivationPage,
    otherwise: Loader.Auth,
  }),
  route: model.currentRoute,
  layout: HomeLayout,
};
