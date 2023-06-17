import { createEffect } from 'effector';

import { ActivationDto, SignInDto } from '@mg-control/shared/dtos';
import { AuthResponse } from '@mg-control/shared/types';
import { api, ApiError } from '@mg-control/web/shared/api';

export const activateFx = createEffect<ActivationDto, void, ApiError>((data) =>
  api.publicRequestFx({
    url: 'auth/activate',
    method: 'POST',
    data,
  }),
);

export const signInFx = createEffect<SignInDto, AuthResponse, ApiError>((data) =>
  api.publicRequestFx({
    url: 'auth/sign-in',
    method: 'POST',
    data,
  }),
);

export const signOutFx = createEffect<void, void, ApiError>(() =>
  api.authorizedRequestFx({
    url: 'auth/sign-out',
    method: 'POST',
  }),
);

export const refreshTokensFx = createEffect<void, AuthResponse, ApiError>(() =>
  api.publicRequestFx({
    url: 'auth/refresh-tokens',
    method: 'GET',
  }),
);
