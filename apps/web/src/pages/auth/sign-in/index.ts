import { createRouteView } from 'atomic-router-react';

import { sessionModel } from '@mg-control/web/entities/session';
import { routes } from '@mg-control/web/shared/routing';
import { Loader } from '@mg-control/web/shared/ui';
import { HomeLayout } from '@mg-control/web/widgets/layouts';

import { SignInPage } from './page';

const currentRoute = routes.auth.signIn;
const anonymousRoute = sessionModel.chainAnonymous(currentRoute);

export const SignInPageRoute = {
  view: createRouteView({
    route: anonymousRoute,
    view: SignInPage,
    otherwise: Loader.Auth,
  }),
  route: currentRoute,
  layout: HomeLayout,
};
