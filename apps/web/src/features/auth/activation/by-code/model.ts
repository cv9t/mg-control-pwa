import { attach, createEvent, sample } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { $$sessionApiModel, ActivateBody } from '@mg-control/web/entities/session';

export const activationByCodeFactory = modelFactory(() => {
  const activateFx = attach({ effect: $$sessionApiModel.activateFx });

  const pageMounted = createEvent();
  const formSubmitted = createEvent<ActivateBody>();

  const $formSubmitPending = activateFx.pending;

  sample({ clock: formSubmitted, target: activateFx });

  return {
    pageMounted,
    formSubmitted,
    $formSubmitPending,
  };
});

export type ActivationByCodeModel = Model<typeof activationByCodeFactory>;
