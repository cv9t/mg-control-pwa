import { createRouteView } from 'atomic-router-react';

import { chainAnonymous } from '@mg-control/web/entities/session';
import { routes } from '@mg-control/web/shared/routing';
import { PageLoader } from '@mg-control/web/shared/ui';
import { HomeLayout } from '@mg-control/web/widgets/layouts';

import { SignInPage } from './ui';

export const SignInPageRoute = {
  view: createRouteView({
    route: chainAnonymous(routes.auth.signIn),
    view: SignInPage,
    otherwise: PageLoader,
  }),
  route: routes.auth.signIn,
  layout: HomeLayout,
};
