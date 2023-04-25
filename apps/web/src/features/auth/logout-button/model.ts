import { useNavigate } from "react-router-dom";
import { createEffect } from "effector";
import { useStore } from "effector-react";

import { sessionModel } from "@/entities/session";
import { types } from "@/shared/api";
import { MG_CONTROL_ACCESS_TOKEN, routes } from "@/shared/config";
import { alert } from "@/shared/lib";

import logoutButtonApi from "./api";

export const logoutFx = createEffect<void, unknown, types.ApiError>(() => logoutButtonApi.logout());

logoutFx.done.watch(() => {
  localStorage.removeItem(MG_CONTROL_ACCESS_TOKEN);
  sessionModel.setAuth(false);
});

logoutFx.failData.watch(({ message }) => {
  alert.error(message);
});

export const useLogoutButton = () => {
  const isLoading = useStore(logoutFx.pending);

  const navigate = useNavigate();

  return { isLoading, logout: () => logoutFx().then(() => navigate(routes.LOGIN)) } as const;
};
