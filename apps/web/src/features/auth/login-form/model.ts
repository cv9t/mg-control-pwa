import { LoginRequestData } from "@mg-control/types";
import { createEffect, createStore } from "effector";
import { useStore } from "effector-react";

import { sessionModel } from "@/entities/session";
import { types } from "@/shared/api";
import { MG_CONTROL_ACCESS_TOKEN } from "@/shared/config";
import { alert } from "@/shared/lib";

import api from "./api";

export const loginFx = createEffect<LoginRequestData, types.AuthResponse, types.ApiError>((credentials) => api.login(credentials));

const $errorMessage = createStore<string | null>(null).on(loginFx.failData, (_, { message, kind }) => {
  if (kind === "unauthorized") {
    return "Неверный адрес электронный почты или пароль";
  }
  alert.error(message);
  return null;
});

loginFx.doneData.watch(({ accessToken }) => {
  localStorage.setItem(MG_CONTROL_ACCESS_TOKEN, accessToken);
  sessionModel.setAuth(true);
});

export const useLoginForm = () => {
  const errorMessage = useStore($errorMessage);
  const isLoading = useStore(loginFx.pending);
  return { errorMessage, isLoading } as const;
};
