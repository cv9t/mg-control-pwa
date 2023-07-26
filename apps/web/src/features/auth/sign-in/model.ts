import { attach, createEvent, createStore, sample } from 'effector';
import { createForm } from 'effector-forms';

import { redirect } from 'atomic-router';

import { Nullable } from '@mg-control/shared/types';
import { sessionModel } from '@mg-control/web/entities/session';
import { ApiErrorType } from '@mg-control/web/shared/api';
import { notification, validation } from '@mg-control/web/shared/lib';
import { routes } from '@mg-control/web/shared/routing';

export const mounted = createEvent();

const signInFx = attach({ effect: sessionModel.signInFx });

export const form = createForm({
  fields: {
    email: {
      init: '',
      rules: [validation.rules.required('Email is required!'), validation.rules.email('Enter valid email!')],
    },
    password: {
      init: '',
      rules: [validation.rules.required('Password is required!')],
    },
  },
  validateOn: ['submit'],
});

const ERROR_TYPES: { [key: string]: ApiErrorType } = {
  invalid_credentials: 'invalid_credentials',
};

export const $error = createStore<Nullable<string>>(null)
  .on(signInFx.failData, (_, error) => {
    if (error.type === ERROR_TYPES.invalid_credentials) {
      return 'Invalid email or password!';
    }
    return null;
  })
  .reset(mounted);

export const $isPending = signInFx.pending;

sample({ clock: mounted, target: form.reset });
sample({ clock: form.formValidated, target: signInFx });
sample({ clock: signInFx, target: form.resetErrors });

sample({
  clock: signInFx.failData,
  filter: (error) => !Object.values(ERROR_TYPES).includes(error.type),
  target: notification.showError.prepend(() => ({
    title: 'Sign In Error!',
    message: 'Sign In failed. Try again later.',
  })),
});

redirect({ clock: signInFx.done, route: routes.dashboard });
