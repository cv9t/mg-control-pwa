import { attach, createEvent, createStore, sample } from 'effector';
import { Model, modelFactory } from 'effector-factorio';
import { createForm } from 'effector-forms';

import { ActivationDto } from '@mg-control/shared/dtos';
import { Nullable } from '@mg-control/shared/typings';
import { SessionModel } from '@mg-control/web/entities/session';
import { ApiRequestConfig } from '@mg-control/web/shared/api';
import { excludeField, validationRules } from '@mg-control/web/shared/lib';

export type ActivationFormFactoryOptions = {
  $$sessionModel: SessionModel;
};

export const activationFormFactory = modelFactory(
  ({ $$sessionModel }: ActivationFormFactoryOptions) => {
    const mounted = createEvent();

    const activateFx = attach({
      effect: $$sessionModel.activateFx,
      mapParams: (data: ActivationDto): ApiRequestConfig<ActivationDto> => ({
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
    const $activationError = createStore<Nullable<string>>(null)
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

    const $formDisabled = activateFx.pending;

    sample({ clock: mounted, target: $$form.reset });
    sample({ clock: activateFx, target: $$form.resetErrors });

    sample({
      clock: $$form.formValidated,
      fn: (values) => excludeField(values, 'confirmation'),
      target: activateFx,
    });

    return {
      mounted,
      $$form,
      $activationError,
      $formDisabled,
    };
  },
);

export type ActivationFormModel = Model<typeof activationFormFactory>;
