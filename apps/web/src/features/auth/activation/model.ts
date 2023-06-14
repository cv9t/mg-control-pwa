import { attach, createEvent, createStore, Effect, forward, sample } from 'effector';
import { Model, modelFactory } from 'effector-factorio';
import { createForm } from 'effector-forms';

import { ActivationDto } from '@mg-control/shared/dtos';
import { Nullable } from '@mg-control/shared/typings';
import { ApiError, RequestConfig } from '@mg-control/web/shared/api';
import { excludeField, validationRules } from '@mg-control/web/shared/lib';

export type ActivationFormFactoryOptions = {
  activateFx: Effect<RequestConfig<ActivationDto>, void, ApiError>;
};

export const activationFormFactory = modelFactory((options: ActivationFormFactoryOptions) => {
  const mounted = createEvent();

  const activateFx = attach({
    effect: options.activateFx,
    mapParams: (data: ActivationDto): RequestConfig<ActivationDto> => ({
      data,
      errorNotificationOptions: {
        title: 'Activation Error!',
        message: 'Activation failed. Try again later.',
      },
      ignoreErrorTypes: [
        'device_already_activated',
        'invalid_activation_code',
        'user_already_exists',
      ],
    }),
  });

  const $$form = createForm({
    fields: {
      activationCode: {
        init: '',
        rules: [validationRules.required('Activation code is required!')],
      },
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
      confirmation: {
        init: '',
        rules: [
          {
            name: 'confirmation',
            validator: (confirmation, { password }) => confirmation === password,
            errorText: 'Your password and confirmation password must match!',
          },
        ],
      },
    },
  });

  const $error = createStore<Nullable<string>>(null)
    .on(activateFx.failData, (_, error) => {
      if (error.type === 'device_already_activated') {
        return 'Device already activated!';
      }
      if (error.type === 'invalid_activation_code') {
        return 'Invalid activation code!';
      }
      if (error.type === 'user_already_exists') {
        return 'User with this email already exists!';
      }
      return null;
    })
    .reset(mounted);

  const $isPending = activateFx.pending;

  forward({ from: mounted, to: $$form.reset });
  forward({ from: activateFx, to: $$form.resetErrors });

  sample({
    clock: $$form.formValidated,
    fn: (values) => excludeField(values, 'confirmation'),
    target: activateFx,
  });

  return {
    mounted,
    $$form,
    $error,
    $isPending,
  };
});

export type ActivationFormModel = Model<typeof activationFormFactory>;
