import { chainAuthorized } from '@mg-control/web/entities/session';
import { routes } from '@mg-control/web/shared/routing';

export const dashboardPageRoute = routes.dashboard;
export const authorizedDashboardPageRoute = chainAuthorized(dashboardPageRoute, {
  otherwise: routes.auth.signIn.open,
});
