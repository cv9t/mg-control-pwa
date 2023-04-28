import { createEffect, createEvent, createStore } from "effector";
import * as effector from "effector-react";

import { types } from "@/shared/api";
import { helpers } from "@/shared/lib";

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
  helpers.setAccessToken(accessToken);
  setAuth(true);
});

export const useStore = () => effector.useStore($sessionStore);
