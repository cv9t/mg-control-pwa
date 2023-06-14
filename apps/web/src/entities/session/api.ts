import { Model, modelFactory } from 'effector-factorio';

import { ActivationDto, SignInDto } from '@mg-control/shared/dtos';
import { AuthResponse } from '@mg-control/shared/typings';
import { $$apiModel, ApiModel } from '@mg-control/web/shared/api';

type SessionApiFactoryOptions = {
  $$apiModel: ApiModel;
};

const sessionApiFactory = modelFactory((options: SessionApiFactoryOptions) => {
  const activateFx = options.$$apiModel.createRequestFx<ActivationDto, void>({
    url: 'auth/activate',
    method: 'POST',
  });

  const signInFx = options.$$apiModel.createRequestFx<SignInDto, AuthResponse>({
    url: 'auth/sign-in',
    method: 'POST',
  });

  const signOutFx = options.$$apiModel.createAuthorizedRequestFx<void, void>({
    url: 'auth/sign-out',
    method: 'POST',
  });

  const checkAuthFx = options.$$apiModel.createAuthorizedRequestFx<void, AuthResponse>({
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
