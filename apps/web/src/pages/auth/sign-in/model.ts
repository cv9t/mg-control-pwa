import { Model, modelFactory } from 'effector-factorio';

import { $$sessionModel, SessionModel } from '@mg-control/web/entities/session';
import { signInFormFactory } from '@mg-control/web/features/auth/sign-in-form';

type SignInPageFactoryOptions = {
  $$sessionModel: SessionModel;
};

const signInPageFactory = modelFactory(({ $$sessionModel }: SignInPageFactoryOptions) => {
  const $$signInFormModel = signInFormFactory.createModel({ $$sessionModel });

  return {
    $$signInFormModel,
  };
});

export type SignInPageModel = Model<typeof signInPageFactory>;

export const $$signInPageModel = signInPageFactory.createModel({
  $$sessionModel,
});
