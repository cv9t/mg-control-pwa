import { ActivateRequestData } from "@mg-control/types";
import { createEffect, createStore } from "effector";
import * as effector from "effector-react";

import { sessionModel } from "@/entities/session";
import { types } from "@/shared/api";
import { alert, helpers } from "@/shared/lib";

import * as activateFormApi from "./api";

export const activateFx = createEffect<ActivateRequestData, types.AuthResponse, types.ApiError>((credentials) =>
  activateFormApi.activate(credentials)
);

const $errorMessage = createStore<string | null>(null)
  .on(activateFx.failData, (_, { message, kind }) => {
    if (kind === "bad-data") {
      return message;
    }
    alert.error(message);
    return null;
  })
  .on(activateFx.done, () => null);

activateFx.doneData.watch(({ accessToken }) => {
  helpers.setAccessToken(accessToken);
  sessionModel.setAuth(true);
});

export const useStore = () => {
  const errorMessage = effector.useStore($errorMessage);
  const isLoading = effector.useStore(activateFx.pending);
  return { errorMessage, isLoading };
};
