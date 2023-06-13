import { createEvent, createStore } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { $$sessionModel, SessionModel } from '@mg-control/web/entities/session';
import { activationFormFactory } from '@mg-control/web/features/auth/activation-form';

type ActivationPageFactoryOptions = {
  $$sessionModel: SessionModel;
};

const activationPageFactory = modelFactory(({ $$sessionModel }: ActivationPageFactoryOptions) => {
  const mounted = createEvent();

  const $$activationFormModel = activationFormFactory.createModel({ $$sessionModel });

  const $isActivationCompleted = createStore(false)
    .on($$sessionModel.activateFx.done, () => true)
    .reset(mounted);

  return {
    mounted,
    $$activationFormModel,
    $isActivationCompleted,
  };
});

export type ActivationPageModel = Model<typeof activationFormFactory>;

export const $$activationPageModel = activationPageFactory.createModel({ $$sessionModel });
