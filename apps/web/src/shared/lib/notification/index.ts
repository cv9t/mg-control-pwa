import { ReactNode } from "react";

import { notification } from "antd";
import { IconType } from "antd/es/notification/interface";
import { attach, createEffect, createEvent, sample } from "effector";

type NotificationProps = {
  type: IconType;
  message: string | ReactNode;
};

export const showError = createEvent<string>();
export const showSuccess = createEvent<string>();
export const showWarn = createEvent<string>();
export const showInfo = createEvent<string>();

const showFx = createEffect<NotificationProps, void>(({ type, message }) => {
  notification.open({ type, message });
});
const showErrorFx = attach({
  effect: showFx,
  mapParams: (message: string): NotificationProps => ({ type: "error", message }),
});
const showSuccessFx = attach({
  effect: showFx,
  mapParams: (message: string): NotificationProps => ({ type: "success", message }),
});
const showWarnFx = attach({
  effect: showFx,
  mapParams: (message: string): NotificationProps => ({ type: "warning", message }),
});
const showInfoFx = attach({
  effect: showFx,
  mapParams: (message: string): NotificationProps => ({ type: "info", message }),
});

sample({
  clock: showError,
  target: showErrorFx,
});
sample({
  clock: showSuccess,
  target: showSuccessFx,
});
sample({
  clock: showWarn,
  target: showWarnFx,
});
sample({
  clock: showInfo,
  target: showInfoFx,
});
