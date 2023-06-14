import { createEvent, sample } from 'effector';

import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router';
import { createBrowserHistory } from 'history';

export const routes = {
  home: createRoute(),
  auth: {
    activation: createRoute(),
    signIn: createRoute(),
  },
  dashboard: createRoute(),
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: [
    {
      path: '/',
      route: routes.home,
    },
    {
      path: '/activation',
      route: routes.auth.activation,
    },
    {
      path: '/sign-in',
      route: routes.auth.signIn,
    },
    {
      path: '/dashboard',
      route: routes.dashboard,
    },
  ],
  controls,
});

export const routerInit = createEvent();

sample({
  clock: routerInit,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
