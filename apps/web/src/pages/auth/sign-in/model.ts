import { chainAnonymous } from '@mg-control/web/entities/session';
import { routes } from '@mg-control/web/shared/routing';

export const signInPageRoute = routes.auth.signIn;
export const anonymousSignInPageRoute = chainAnonymous(signInPageRoute, {
  otherwise: routes.dashboard.open,
});
