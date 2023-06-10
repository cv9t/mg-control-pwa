import { Model, modelFactory } from 'effector-factorio';

import { $$apiModel } from '@mg-control/web/shared/api';

type ActivationBody = {
  activationCode: string;
  email: string;
  password: string;
};

type SignInBody = {
  email: string;
  password: string;
};

type AuthResponse = {
  accessToken: string;
};

const sessionApiFactory = modelFactory(() => {
  const activateFx = $$apiModel.createRequestFx<ActivationBody, AuthResponse>({
    url: 'auth/activate',
    method: 'POST',
  });

  const signInFx = $$apiModel.createRequestFx<SignInBody, AuthResponse>({
    url: 'auth/signIn',
    method: 'POST',
  });

  const refreshTokensFx = $$apiModel.createAuthorizedRequestFx<void, AuthResponse>({
    url: 'auth/refresh-tokens',
    method: 'GET',
  });

  return {
    activateFx,
    signInFx,
    refreshTokensFx,
  };
});

export type SessionApiModel = Model<typeof sessionApiFactory>;

export const $$sessionApiModel = sessionApiFactory.createModel();
