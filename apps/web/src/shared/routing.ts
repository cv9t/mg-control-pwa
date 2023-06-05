import { createHistoryRouter, createRoute, createRouterControls } from "atomic-router";
import { sample } from "effector";
import { createBrowserHistory } from "history";

import { init } from "./config";

export const routes = {
  home: createRoute(),
  activate: createRoute(),
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: [
    {
      path: "/",
      route: routes.home,
    },
    {
      path: "/activate",
      route: routes.activate,
    },
  ],
  controls,
});

sample({
  clock: init.appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
