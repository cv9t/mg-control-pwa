import { MouseEvent } from 'react';

import { attach, createEvent, Effect, forward } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { redirect } from 'atomic-router';

import { ApiError, RequestConfig } from '@mg-control/web/shared/api';
import { routes } from '@mg-control/web/shared/routing';

type SignOutButtonFactoryOptions = {
  signOutFx: Effect<RequestConfig<void>, void, ApiError>;
};

export const signOutButtonFactory = modelFactory((options: SignOutButtonFactoryOptions) => {
  const signOutClicked = createEvent<MouseEvent>();

  const signOutFx = attach({
    effect: options.signOutFx,
    mapParams: (): RequestConfig<void> => ({
      errorNotificationOptions: {
        title: 'Sign out Error!',
        message: 'Sign out failed.',
      },
    }),
  });

  const $isPending = signOutFx.pending;

  forward({ from: signOutClicked, to: signOutFx });
  redirect({ clock: signOutFx.done, route: routes.home });

  return { signOutClicked, $isPending };
});

export type SignOutButtonModel = Model<typeof signOutButtonFactory>;
