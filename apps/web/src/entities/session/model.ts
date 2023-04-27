import { useEffect, useState } from "react";
import { createEffect, createEvent, createStore } from "effector";
import { useStore } from "effector-react";

import { types } from "@/shared/api";
import { api } from "@/shared/config";
import { alert } from "@/shared/lib";

import * as sessionApi from "./api";

type SessionStore = {
  isAuth: boolean;
};

const initialState: SessionStore = {
  isAuth: false,
};

export const setAuth = createEvent<boolean>();

const $sessionStore = createStore<SessionStore>(initialState).on(setAuth, (state, isAuth) => ({
  ...state,
  isAuth,
}));

export const checkAuthFx = createEffect<void, types.AuthResponse, types.ApiError>(() => sessionApi.refreshToken());

checkAuthFx.doneData.watch(({ accessToken }) => {
  localStorage.setItem(api.MG_CONTROL_ACCESS_TOKEN, accessToken);
  setAuth(true);
});

checkAuthFx.fail.watch(({ error }) => alert.error(error.message));

export const useSessionStore = () => useStore($sessionStore);

export const useAuthCheck = () => {
  const [authChecked, setAuthChecked] = useState(() => !localStorage.getItem(api.MG_CONTROL_ACCESS_TOKEN));

  useEffect(() => {
    if (!authChecked) {
      checkAuthFx().finally(() => setAuthChecked(true));
    }
  }, []);

  return { authChecked } as const;
};
