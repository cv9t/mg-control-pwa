import { createRouteView } from 'atomic-router-react';

import { PageLoader } from '@mg-control/web/shared/ui';
import { HomeLayout } from '@mg-control/web/widgets/layouts';

import { anonymousSignInPageRoute, signInPageRoute } from './model';
import { SignInPage } from './ui';

export const SignInRoute = {
  view: createRouteView({
    route: anonymousSignInPageRoute,
    view: SignInPage,
    otherwise: PageLoader,
  }),
  route: signInPageRoute,
  layout: HomeLayout,
};
