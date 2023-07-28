import { attach, createEvent, createStore, Effect, Event, merge, sample } from 'effector';

import { chainRoute, RouteInstance, RouteParams, RouteParamsAndQuery } from 'atomic-router';
import { combineEvents } from 'patronum';

import { notification } from '@mg-control/web/shared/lib';
import { routes } from '@mg-control/web/shared/routing';
import * as tokenStorage from '@mg-control/web/shared/token-storage';

import * as sessionApi from './api';

enum AuthStatus {
  Initial,
  Pending,
  Anonymous,
  Authorized,
}

const syncedWithToken = createEvent<AuthStatus>();

export const activateFx = attach({ effect: sessionApi.activateFx });
export const signInFx = attach({ effect: sessionApi.signInFx });
export const signOutFx = attach({ effect: sessionApi.signOutFx });
export const refreshTokensFx = attach({ effect: sessionApi.refreshTokensFx });

const sessionPending = merge([signInFx, refreshTokensFx]);
const sessionEstablished = merge([signInFx.doneData, refreshTokensFx.doneData]);
const sessionFailed = merge([refreshTokensFx.fail, signOutFx.done]);

const $authStatus = createStore<AuthStatus>(AuthStatus.Initial)
  .on(sessionPending, () => AuthStatus.Pending)
  .on(sessionEstablished, () => AuthStatus.Authorized)
  .on(sessionFailed, () => AuthStatus.Anonymous)
  .on(syncedWithToken, (_, syncedStatus) => syncedStatus);

sample({
  clock: tokenStorage.initialized,
  source: tokenStorage.$token,
  fn: (token) => (token ? AuthStatus.Initial : AuthStatus.Anonymous),
  target: syncedWithToken,
});

sample({
  clock: refreshTokensFx.failData,
  target: notification.showError.prepend(() => ({
    title: 'Authorization Error!',
    message: 'Failed to check authorization.',
  })),
});

sample({
  clock: sessionEstablished,
  fn: ({ accessToken }) => accessToken,
  target: tokenStorage.saveToken,
});
sample({ clock: sessionFailed, target: tokenStorage.deleteToken });

type ChainParams = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  otherwise?: Event<void> | Effect<void, any, any>;
};

export const chainAuthorized = <Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise = routes.auth.signIn.open }: ChainParams = {},
): RouteInstance<Params> => {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const receivedAnonymous = createEvent<RouteParamsAndQuery<Params>>();

  const initialSessionCheckStarted = combineEvents({
    events: [sessionCheckStarted, syncedWithToken],
  });

  const alreadyAuthorized = sample({
    clock: sessionCheckStarted,
    source: $authStatus,
    filter: (status) => status === AuthStatus.Authorized,
  });

  const alreadyAnonymous = sample({
    clock: [sessionCheckStarted, initialSessionCheckStarted],
    source: $authStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: initialSessionCheckStarted,
    source: $authStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: refreshTokensFx,
  });

  sample({
    clock: [alreadyAnonymous, refreshTokensFx.fail],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: receivedAnonymous,
  });

  sample({ clock: receivedAnonymous, target: otherwise as Event<void> });

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthorized, refreshTokensFx.done],
    cancelOn: receivedAnonymous,
  });
};

export const chainAnonymous = <Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise = routes.dashboard.open }: ChainParams = {},
): RouteInstance<Params> => {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const receivedAuthorized = createEvent<RouteParamsAndQuery<Params>>();

  const initialSessionCheckStarted = combineEvents({
    events: [sessionCheckStarted, syncedWithToken],
  });

  const alreadyAuthorized = sample({
    clock: sessionCheckStarted,
    source: $authStatus,
    filter: (status) => status === AuthStatus.Authorized,
  });

  const alreadyAnonymous = sample({
    clock: [sessionCheckStarted, initialSessionCheckStarted],
    source: $authStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: initialSessionCheckStarted,
    source: $authStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: refreshTokensFx,
  });

  sample({
    clock: [alreadyAuthorized, refreshTokensFx.done],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: receivedAuthorized,
  });

  sample({ clock: receivedAuthorized, target: otherwise as Event<void> });

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, refreshTokensFx.fail],
    cancelOn: receivedAuthorized,
  });
};
