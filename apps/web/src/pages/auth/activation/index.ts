import { routes } from '@mg-control/web/shared/routing';
import { Route } from '@mg-control/web/shared/types';
import { HomeLayout } from '@mg-control/web/widgets/layouts';

import { ActivationPage } from './ui';

export const ActivationRoute: Route = {
  view: ActivationPage,
  route: routes.auth.activation,
  layout: HomeLayout,
};
