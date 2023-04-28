import { createEffect } from "effector";
import * as effector from "effector-react";

import { sessionModel } from "@/entities/session";
import { types } from "@/shared/api";
import { helpers } from "@/shared/lib";

import * as logoutButtonApi from "./api";

export const logoutFx = createEffect<void, unknown, types.ApiError>(() => logoutButtonApi.logout());

logoutFx.done.watch(() => {
  helpers.removeAccessToken();
  sessionModel.setAuth(false);
});

export const useStore = () => {
  const isLoading = effector.useStore(logoutFx.pending);
  return { isLoading };
};
