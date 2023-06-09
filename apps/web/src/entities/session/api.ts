import { Model, modelFactory } from 'effector-factorio';

import { $$apiModel } from '@mg-control/web/shared/api';

export type ActivateBody = {
  activationCode: string;
  email: string;
  password: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
};

export const sessionApiFactory = modelFactory(() => {
  const activateFx = $$apiModel.createRequestFx<ActivateBody, AuthResponse>({
    path: 'activate',
    method: 'POST',
  });

  const signInFx = $$apiModel.createRequestFx<SignInBody, AuthResponse>({
    path: 'signIn',
    method: 'POST',
  });

  return {
    activateFx,
    signInFx,
  };
});

export type SessionApiModel = Model<typeof sessionApiFactory>;

export const $$sessionApiModel = sessionApiFactory.createModel();
