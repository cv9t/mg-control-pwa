import { createRouteView } from 'atomic-router-react';

import { chainAnonymous } from '@mg-control/web/entities/session';
import { routes } from '@mg-control/web/shared/routing';
import { AuthLoader } from '@mg-control/web/shared/ui';
import { HomeLayout } from '@mg-control/web/widgets/layouts';

import { SignInPage } from './ui';

const signInRoute = routes.auth.signIn;
const anonymousSignInRoute = chainAnonymous(signInRoute);

export const SignInPageRoute = {
  view: createRouteView({
    route: anonymousSignInRoute,
    view: SignInPage,
    otherwise: AuthLoader,
  }),
  route: signInRoute,
  layout: HomeLayout,
};
