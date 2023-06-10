import { sample } from 'effector';

import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router';
import { createBrowserHistory } from 'history';

import { appStarted } from './config';

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
      path: '/login',
      route: routes.auth.signIn,
    },
  ],
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
