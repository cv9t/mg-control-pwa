import { LoginRequestData } from "@mg-control/types";
import { createEffect, createStore } from "effector";
import * as effector from "effector-react";

import { sessionModel } from "@/entities/session";
import { types } from "@/shared/api";
import { alert, helpers } from "@/shared/lib";

import * as loginFormApi from "./api";

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
  helpers.setAccessToken(accessToken);
  sessionModel.setAuth(true);
});

export const useStore = () => {
  const errorMessage = effector.useStore($errorMessage);
  const isLoading = effector.useStore(loginFx.pending);
  return {
    errorMessage,
    isLoading,
  };
};
