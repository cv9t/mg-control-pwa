import { attach, createEvent, createStore, Effect, Event, forward, merge, sample } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { chainRoute, RouteInstance, RouteParams, RouteParamsAndQuery } from 'atomic-router';
import { combineEvents } from 'patronum';

import { RequestConfig } from '@mg-control/web/shared/api';
import { routes } from '@mg-control/web/shared/routing';
import { $$tokenStorageModel, TokenStorageModel } from '@mg-control/web/shared/token-storage';

import { $$sessionApiModel, SessionApiModel } from './api';

enum AuthStatus {
  Initial,
  Pending,
  Anonymous,
  Authorized,
}

type SessionFactoryOptions = {
  $$sessionApiModel: SessionApiModel;
  $$tokenStorageModel: TokenStorageModel;
};

const sessionFactory = modelFactory((options: SessionFactoryOptions) => {
  const syncedWithToken = createEvent<AuthStatus>();

  const activateFx = attach({ effect: options.$$sessionApiModel.activateFx });
  const signInFx = attach({ effect: options.$$sessionApiModel.signInFx });
  const signOutFx = attach({ effect: options.$$sessionApiModel.signOutFx });

  const checkAuthFx = attach({
    effect: options.$$sessionApiModel.checkAuthFx,
    mapParams: (): RequestConfig<void> => ({
      errorNotificationOptions: {
        title: 'Authorization Error!',
        message: 'Authorization check failed.',
      },
    }),
  });

  const authStarted = merge([checkAuthFx, signInFx]);
  const authCompleted = merge([checkAuthFx.doneData, signInFx.doneData]);
  const authFailed = merge([checkAuthFx.fail, signOutFx.done]);

  const $authStatus = createStore(AuthStatus.Initial)
    .on(authStarted, () => AuthStatus.Pending)
    .on(authCompleted, () => AuthStatus.Authorized)
    .on(authFailed, () => AuthStatus.Anonymous)
    .on(syncedWithToken, (_, newStatus) => newStatus);

  sample({
    clock: options.$$tokenStorageModel.initCompleted,
    source: options.$$tokenStorageModel.$token,
    fn: (token) => {
      if (token) {
        return AuthStatus.Initial;
      }
      return AuthStatus.Anonymous;
    },
    target: syncedWithToken,
  });

  sample({
    clock: authCompleted,
    fn: ({ accessToken }) => accessToken,
    target: options.$$tokenStorageModel.saveToken,
  });

  forward({ from: authFailed, to: options.$$tokenStorageModel.deleteToken });

  return {
    syncedWithToken,
    activateFx,
    signInFx,
    signOutFx,
    checkAuthFx,
    $authStatus,
  };
});

export type SessionModel = Model<typeof sessionFactory>;

export const $$sessionModel = sessionFactory.createModel({
  $$sessionApiModel,
  $$tokenStorageModel,
});

type ChainParams = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  otherwise?: Event<void> | Effect<void, any, any>;
};

export const chainAuthorized = <Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise = routes.auth.signIn.open }: ChainParams = {},
): RouteInstance<Params> => {
  const authCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const receivedAnonymous = createEvent<RouteParamsAndQuery<Params>>();

  const readyToCheckAuth = combineEvents({
    events: [authCheckStarted, $$sessionModel.syncedWithToken],
  });

  const alreadyAuthorized = sample({
    clock: authCheckStarted,
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Authorized,
  });

  const alreadyAnonymous = sample({
    clock: [authCheckStarted, readyToCheckAuth],
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: readyToCheckAuth,
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: $$sessionModel.checkAuthFx,
  });

  sample({
    clock: [alreadyAnonymous, $$sessionModel.checkAuthFx.fail],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: receivedAnonymous,
  });

  forward({ from: receivedAnonymous, to: otherwise as Event<void> });

  return chainRoute({
    route,
    beforeOpen: authCheckStarted,
    openOn: [alreadyAuthorized, $$sessionModel.checkAuthFx.done],
    cancelOn: receivedAnonymous,
  });
};

export const chainAnonymous = <Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise = routes.dashboard.open }: ChainParams = {},
): RouteInstance<Params> => {
  const authCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const receivedAuthorized = createEvent<RouteParamsAndQuery<Params>>();

  const readyToCheckAuth = combineEvents({
    events: [authCheckStarted, $$sessionModel.syncedWithToken],
  });

  const alreadyAuthorized = sample({
    clock: authCheckStarted,
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Authorized,
  });

  const alreadyAnonymous = sample({
    clock: [authCheckStarted, readyToCheckAuth],
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: readyToCheckAuth,
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: $$sessionModel.checkAuthFx,
  });

  sample({
    clock: [alreadyAuthorized, $$sessionModel.checkAuthFx.done],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: receivedAuthorized,
  });

  forward({ from: receivedAuthorized, to: otherwise as Event<void> });

  return chainRoute({
    route,
    beforeOpen: authCheckStarted,
    openOn: [alreadyAnonymous, $$sessionModel.checkAuthFx.fail],
    cancelOn: receivedAuthorized,
  });
};
