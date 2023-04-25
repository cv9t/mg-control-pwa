import { createEffect } from "effector";
import { useStore } from "effector-react";

import { sessionModel } from "@/entities/session";
import { types } from "@/shared/api";
import { MG_CONTROL_ACCESS_TOKEN } from "@/shared/config";
import { alert } from "@/shared/lib";

import logoutButtonApi from "./api";

export const logoutFx = createEffect<void, unknown, types.ApiError>(() => logoutButtonApi.logout());

logoutFx.doneData.watch(() => {
  localStorage.removeItem(MG_CONTROL_ACCESS_TOKEN);
  sessionModel.setAuth(false);
});

logoutFx.fail.watch(({ error }) => {
  alert.error(error.message);
});

export const useLogoutButton = () => {
  const isLoading = useStore(logoutFx.pending);
  return { isLoading } as const;
};
