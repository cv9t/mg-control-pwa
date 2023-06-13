import { attach, createEvent, createStore, sample } from 'effector';
import { Model, modelFactory } from 'effector-factorio';
import { createForm } from 'effector-forms';

import { redirect } from 'atomic-router';

import { SignInDto } from '@mg-control/shared/dtos';
import { Nullable } from '@mg-control/shared/typings';
import { SessionModel } from '@mg-control/web/entities/session';
import { ApiRequestConfig } from '@mg-control/web/shared/api';
import { validationRules } from '@mg-control/web/shared/lib';
import { routes } from '@mg-control/web/shared/routing';

type SignInFormFactoryOptions = {
  $$sessionModel: SessionModel;
};

export const signInFormFactory = modelFactory(({ $$sessionModel }: SignInFormFactoryOptions) => {
  const mounted = createEvent();

  const signInFx = attach({
    effect: $$sessionModel.signInFx,
    mapParams: (data: SignInDto): ApiRequestConfig<SignInDto> => ({
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
  const $signInError = createStore<Nullable<string>>(null)
    .reset(mounted)
    .on(signInFx.failData, (_, error) => {
      if (error.type === 'invalid_credentials') {
        return 'Invalid email or password!';
      }
      return null;
    });

  const $formDisabled = signInFx.pending;

  sample({ clock: mounted, target: $$form.reset });
  sample({ clock: $$form.formValidated, target: signInFx });
  sample({ clock: signInFx, target: $$form.resetErrors });

  redirect({ clock: signInFx.done, route: routes.dashboard });

  return {
    mounted,
    $$form,
    $signInError,
    $formDisabled,
  };
});

export type SignInFormModel = Model<typeof signInFormFactory>;
