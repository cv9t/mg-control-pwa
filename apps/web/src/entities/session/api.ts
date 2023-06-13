import { Model, modelFactory } from 'effector-factorio';

import { ActivationDto, SignInDto } from '@mg-control/shared/dtos';
import { AuthResponse } from '@mg-control/shared/typings';
import { $$apiModel, ApiModel } from '@mg-control/web/shared/api';

type SessionApiFactoryOptions = {
  $$apiModel: ApiModel;
};

const sessionApiFactory = modelFactory(({ $$apiModel }: SessionApiFactoryOptions) => {
  const activateFx = $$apiModel.createRequestFx<ActivationDto, void>({
    url: 'auth/activate',
    method: 'POST',
  });

  const signInFx = $$apiModel.createRequestFx<SignInDto, AuthResponse>({
    url: 'auth/sign-in',
    method: 'POST',
  });

  const signOutFx = $$apiModel.createAuthorizedRequestFx<void, void>({
    url: 'auth/sign-out',
    method: 'POST',
  });

  const checkAuthFx = $$apiModel.createAuthorizedRequestFx<void, AuthResponse>({
    url: 'auth/refresh-tokens',
    method: 'GET',
  });

  return {
    activateFx,
    signInFx,
    signOutFx,
    checkAuthFx,
  };
});

export type SessionApiModel = Model<typeof sessionApiFactory>;

export const $$sessionApiModel = sessionApiFactory.createModel({ $$apiModel });
