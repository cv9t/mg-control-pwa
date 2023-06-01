import { MouseEvent } from "react";

import { redirect } from "atomic-router";
import { createEvent } from "effector";

import { routes } from "@/shared/routing";

export const currentRoute = routes.home;

export const goActivatePressed = createEvent<MouseEvent>();

redirect({
  clock: goActivatePressed,
  route: routes.activate,
});
