import { createEffect, createEvent, createStore } from "effector";
import { useStore } from "effector-react";

import { types } from "@/shared/api";
import { MG_CONTROL_ACCESS_TOKEN } from "@/shared/config";
import { alert } from "@/shared/lib";

import api from "./api";

type Session = {
  isAuth: boolean;
};

const initialState: Session = {
  isAuth: false,
};

export const setAuth = createEvent<boolean>();

const $session = createStore<Session>(initialState).on(setAuth, (state, isAuth) => ({
  ...state,
  isAuth,
}));

export const checkAuthFx = createEffect<void, types.AuthResponse, types.ApiError>(() => api.refreshToken());

checkAuthFx.doneData.watch(({ accessToken }) => {
  localStorage.setItem(MG_CONTROL_ACCESS_TOKEN, accessToken);
  setAuth(true);
});

checkAuthFx.fail.watch(({ error }) => {
  if (error.kind === "unauthorized") {
    localStorage.removeItem(MG_CONTROL_ACCESS_TOKEN);
    alert.error("Пользователь не авторизован");
    return;
  }
  alert.error(error.message);
});

export const useSession = () => useStore($session);
