import { attach, createEffect, createEvent, sample } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { NotificationProps, notifications } from '@mantine/notifications';

export type NotificationOptions = {
  title?: string;
  message: string;
};

const notificationFactory = modelFactory(() => {
  const showError = createEvent<NotificationOptions>();

  const showFx = createEffect<NotificationProps, void>((props) => {
    notifications.show({ withBorder: true, ...props });
  });

  const showErrorFx = attach({
    effect: showFx,
    mapParams: (options: NotificationOptions): NotificationProps => ({
      ...options,
      color: 'red',
    }),
  });

  sample({ clock: showError, filter: ({ message }) => Boolean(message), target: showErrorFx });

  return {
    showError,
  };
});

export type NotificationModel = Model<typeof notificationFactory>;

export const $$notificationModel = notificationFactory.createModel();
