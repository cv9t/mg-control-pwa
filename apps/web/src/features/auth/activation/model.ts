import { attach, createEvent, createStore, Effect, Event, sample, Store } from 'effector';
import { createForm, Form } from 'effector-forms';

import { ActivationDto } from '@mg-control/shared/dtos';
import { Nullable } from '@mg-control/shared/types';
import { ApiError, ApiErrorType } from '@mg-control/web/shared/api';
import { notification, object, validation } from '@mg-control/web/shared/lib';

type CreateActivationFormModelOptions = {
  activateFx: Effect<ActivationDto, void, ApiError>;
};

const ERROR_TYPES: { [key: string]: ApiErrorType } = {
  device_already_activated: 'device_already_activated',
  invalid_activation_code: 'invalid_activation_code',
  user_already_exists: 'user_already_exists',
};

export const createActivationFormModel = (
  options: CreateActivationFormModelOptions,
): {
  mounted: Event<void>;
  form: Form<{
    activationCode: string;
    email: string;
    password: string;
    confirmation: string;
  }>;
  $error: Store<Nullable<string>>;
  $isPending: Store<boolean>;
} => {
  const mounted = createEvent();

  const activateFx = attach({ effect: options.activateFx });

  const form = createForm({
    fields: {
      activationCode: {
        init: '',
        rules: [validation.rules.required('Activation code is required!')],
      },
      email: {
        init: '',
        rules: [
          validation.rules.required('Email is required!'),
          validation.rules.email('Enter valid email!'),
        ],
      },
      password: {
        init: '',
        rules: [validation.rules.required('Password is required!')],
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
      if (error.type === ERROR_TYPES.device_already_activated) {
        return 'Device already activated!';
      }
      if (error.type === ERROR_TYPES.invalid_activation_code) {
        return 'Invalid activation code!';
      }
      if (error.type === ERROR_TYPES.user_already_exists) {
        return 'User with this email already exists!';
      }
      return null;
    })
    .reset(mounted);

  const $isPending = activateFx.pending;

  sample({ clock: mounted, target: form.reset });
  sample({
    clock: form.formValidated,
    fn: (formValues) => object.excludeField(formValues, 'confirmation'),
    target: activateFx,
  });
  sample({ clock: activateFx, target: form.resetErrors });

  sample({
    clock: activateFx.failData,
    filter: (error) => !Object.values(ERROR_TYPES).includes(error.type),
    target: notification.showError.prepend(() => ({
      title: 'Activation Error!',
      message: 'Activation failed. Try again later.',
    })),
  });

  return { mounted, form, $error, $isPending };
};

export type ActivationFormModel = ReturnType<typeof createActivationFormModel>;
