import { attach, createEvent, createStore, Effect, forward } from 'effector';
import { Model, modelFactory } from 'effector-factorio';
import { createForm } from 'effector-forms';

import { redirect } from 'atomic-router';

import { SignInDto } from '@mg-control/shared/dtos';
import { AuthResponse, Nullable } from '@mg-control/shared/typings';
import { ApiError, RequestConfig } from '@mg-control/web/shared/api';
import { validationRules } from '@mg-control/web/shared/lib';
import { routes } from '@mg-control/web/shared/routing';

type SignInFormFactoryOptions = {
  signInFx: Effect<RequestConfig<SignInDto>, AuthResponse, ApiError>;
};

export const signInFormFactory = modelFactory((options: SignInFormFactoryOptions) => {
  const mounted = createEvent();

  const signInFx = attach({
    effect: options.signInFx,
    mapParams: (data: SignInDto): RequestConfig<SignInDto> => ({
      data,
      errorNotificationOptions: {
        title: 'Sign In Error!',
        message: 'Sign In failed. Try again later.',
      },
      ignoreErrorTypes: ['invalid_credentials'],
    }),
  });

  const $$form = createForm({
    fields: {
      email: {
        init: '',
        rules: [
          validationRules.required('Email is required!'),
          validationRules.email('Enter valid email!'),
        ],
      },
      password: {
        init: '',
        rules: [validationRules.required('Password is required!')],
      },
    },
    validateOn: ['submit'],
  });

  const $error = createStore<Nullable<string>>(null)
    .reset(mounted)
    .on(signInFx.failData, (_, error) => {
      if (error.type === 'invalid_credentials') {
        return 'Invalid email or password!';
      }
      return null;
    });

  const $isPending = signInFx.pending;

  forward({ from: mounted, to: $$form.reset });
  forward({ from: $$form.formValidated, to: signInFx });
  forward({ from: signInFx, to: $$form.resetErrors });
  redirect({ clock: signInFx.done, route: routes.dashboard });

  return {
    mounted,
    $$form,
    $error,
    $isPending,
  };
});

export type SignInFormModel = Model<typeof signInFormFactory>;
