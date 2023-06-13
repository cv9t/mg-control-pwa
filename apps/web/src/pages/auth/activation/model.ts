import { createEvent, createStore } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { $$sessionModel, SessionModel } from '@mg-control/web/entities/session';
import { activationFormFactory } from '@mg-control/web/features/auth/activation/model';

type ActivationPageFactoryOptions = {
  $$sessionModel: SessionModel;
};

const activationPageFactory = modelFactory(({ $$sessionModel }: ActivationPageFactoryOptions) => {
  const mounted = createEvent();

  const $activationDone = createStore(false)
    .on($$sessionModel.activateFx.done, () => true)
    .reset(mounted);

  const $$activationFormModel = activationFormFactory.createModel({ $$sessionModel });

  return {
    mounted,
    $activationDone,
    $$activationFormModel,
  };
});

export type ActivationPageModel = Model<typeof activationFormFactory>;

export const $$activationPageModel = activationPageFactory.createModel({ $$sessionModel });
