import { attach, createEvent, createStore, Effect, Event, sample } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { chainRoute, RouteInstance, RouteParams, RouteParamsAndQuery } from 'atomic-router';

import { $$tokenStorageModel } from '@mg-control/web/shared/token-storage';

import { $$sessionApiModel } from './api';

enum AuthStatus {
  Initial = 0,
  Pending,
  Anonymous,
  Authorized,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ChainParams<Params extends RouteParams> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  otherwise?: Event<void> | Effect<void, any, any>;
};

const sessionFactory = modelFactory(() => {
  const refreshTokensFx = attach({ effect: $$sessionApiModel.refreshTokensFx });

  const $authStatus = createStore(AuthStatus.Initial);

  sample({
    clock: refreshTokensFx,
    source: $authStatus,
    fn: (status) => {
      if (status === AuthStatus.Initial) return AuthStatus.Pending;
      return status;
    },
    target: $authStatus,
  });

  sample({
    clock: refreshTokensFx.doneData,
    fn: ({ accessToken }) => accessToken,
    target: $$tokenStorageModel.updateToken,
  });

  sample({ clock: refreshTokensFx.done, fn: () => AuthStatus.Authorized, target: $authStatus });
  sample({ clock: refreshTokensFx.fail, fn: () => AuthStatus.Anonymous, target: $authStatus });

  return {
    refreshTokensFx,
    $authStatus,
  };
});

export type SessionModel = Model<typeof sessionFactory>;

export const $$sessionModel = sessionFactory.createModel();

export const chainAuthorized = <Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams<Params> = {},
): RouteInstance<Params> => {
  const authCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const authCheckFailed = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthorized = sample({
    clock: authCheckStarted,
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Authorized,
  });

  const alreadyAnonymous = sample({
    clock: authCheckStarted,
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: authCheckStarted,
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: $$sessionModel.refreshTokensFx,
  });

  sample({
    clock: [alreadyAnonymous, $$sessionModel.refreshTokensFx.fail],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: authCheckFailed,
  });

  if (otherwise) {
    sample({
      clock: authCheckFailed,
      target: otherwise as Event<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: authCheckStarted,
    openOn: [alreadyAuthorized, $$sessionModel.refreshTokensFx.done],
    cancelOn: authCheckFailed,
  });
};

export const chainAnonymous = <Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams<Params> = {},
): RouteInstance<Params> => {
  const authCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const authChecked = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthorized = sample({
    clock: authCheckStarted,
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Authorized,
  });

  const alreadyAnonymous = sample({
    clock: authCheckStarted,
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: authCheckStarted,
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: $$sessionModel.refreshTokensFx,
  });

  sample({
    clock: [alreadyAuthorized, $$sessionModel.refreshTokensFx.done],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: authChecked,
  });

  if (otherwise) {
    sample({
      clock: authChecked,
      target: otherwise as Event<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: authCheckStarted,
    openOn: [alreadyAnonymous, $$sessionModel.refreshTokensFx.fail],
    cancelOn: authChecked,
  });
};
