import { attach, createEffect, createEvent, sample } from 'effector';

import { NotificationProps, notifications } from '@mantine/notifications';

export type ShowNotificationOptions = {
  title?: string;
  message: string;
};

export const showError = createEvent<ShowNotificationOptions>();
export const showSuccess = createEvent<ShowNotificationOptions>();

const showFx = createEffect<NotificationProps, void>((props) => {
  notifications.show({ withBorder: true, ...props });
});

const showErrorFx = attach({
  effect: showFx,
  mapParams: (options: ShowNotificationOptions): NotificationProps => ({
    ...options,
    color: 'red',
  }),
});

const showSuccessFx = attach({
  effect: showFx,
  mapParams: (options: ShowNotificationOptions): NotificationProps => ({
    ...options,
    color: 'green',
  }),
});

sample({ clock: showError, target: showErrorFx });
sample({ clock: showSuccess, target: showSuccessFx });
