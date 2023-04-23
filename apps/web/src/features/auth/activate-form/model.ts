import { ActivateRequestData } from "@mg-control/types";
import { createEffect, createStore } from "effector";
import { useStore } from "effector-react";

import { sessionModel } from "@/entities/session";
import { types } from "@/shared/api";
import { MG_CONTROL_ACCESS_TOKEN } from "@/shared/config";
import { alert } from "@/shared/lib";

import activateFormApi from "./api";

export const activateFx = createEffect<ActivateRequestData, types.AuthResponse, types.ApiError>((credentials) =>
  activateFormApi.activate(credentials)
);

const $errorMessage = createStore<string | null>(null).on(activateFx.failData, (_, { message, kind }) => {
  if (kind === "bad-data") {
    return message;
  }
  alert.error(message);
  return null;
});

activateFx.doneData.watch(({ accessToken }) => {
  localStorage.setItem(MG_CONTROL_ACCESS_TOKEN, accessToken);
  sessionModel.setAuth(true);
});

export const useActivateForm = () => {
  const errorMessage = useStore($errorMessage);
  const isLoading = useStore(activateFx.pending);
  return { errorMessage, isLoading } as const;
};
