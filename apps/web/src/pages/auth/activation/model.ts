import { Model, modelFactory } from 'effector-factorio';

import { activationByCodeFactory } from '@mg-control/web/features/auth/activation';

const activationPageFactory = modelFactory(() => {
  const $$activationByCodeModel = activationByCodeFactory.createModel();

  return {
    $$activationByCodeModel,
  };
});

export type ActivationPageModel = Model<typeof activationByCodeFactory>;

export const $$activationPageModel = activationPageFactory.createModel();
