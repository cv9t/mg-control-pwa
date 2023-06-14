import { attach } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { $$sessionModel, SessionModel } from '@mg-control/web/entities/session';
import { signInFormFactory } from '@mg-control/web/features/auth/sign-in';

type SignInPageFactoryOptions = {
  $$sessionModel: SessionModel;
};

const signInPageFactory = modelFactory((options: SignInPageFactoryOptions) => {
  const signInFx = attach({ effect: options.$$sessionModel.signInFx });

  const $$signInFormModel = signInFormFactory.createModel({ signInFx });

  return {
    $$signInFormModel,
  };
});

export type SignInPageModel = Model<typeof signInPageFactory>;

export const $$signInPageModel = signInPageFactory.createModel({
  $$sessionModel,
});
