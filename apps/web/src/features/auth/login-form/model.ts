import { useNavigate } from "react-router-dom";
import { LoginRequestData } from "@mg-control/types";
import { createEffect, createStore } from "effector";
import { useStore } from "effector-react";

import { sessionModel } from "@/entities/session";
import { types } from "@/shared/api";
import { MG_CONTROL_ACCESS_TOKEN, routes } from "@/shared/config";
import { alert } from "@/shared/lib";

import loginFormApi from "./api";

export const loginFx = createEffect<LoginRequestData, types.AuthResponse, types.ApiError>((credentials) => loginFormApi.login(credentials));

const $errorMessage = createStore<string | null>(null)
  .on(loginFx.failData, (_, { message, kind }) => {
    if (kind === "unauthorized") {
      return "Неверный адрес электронный почты или пароль";
    }
    alert.error(message);
    return null;
  })
  .on(loginFx.done, () => null);

loginFx.doneData.watch(({ accessToken }) => {
  localStorage.setItem(MG_CONTROL_ACCESS_TOKEN, accessToken);
  sessionModel.setAuth(true);
});

export const useLoginForm = () => {
  const errorMessage = useStore($errorMessage);
  const isLoading = useStore(loginFx.pending);

  const navigate = useNavigate();

  return {
    errorMessage,
    isLoading,
    login: (credentials: LoginRequestData) => loginFx(credentials).then(() => navigate(routes.DASHBOARD)),
  } as const;
};
