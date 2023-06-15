import { attach, createEvent, createStore, Effect, Event, merge, sample } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import {
  chainRoute,
  redirect,
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
} from 'atomic-router';
import { combineEvents } from 'patronum';

import {
  $$apiModel,
  ApiError,
  isUnauthorizedError,
  RequestConfig,
} from '@mg-control/web/shared/api';
import { routes } from '@mg-control/web/shared/routing';
import { $$tokenStorageModel, TokenStorageModel } from '@mg-control/web/shared/token-storage';

import { $$sessionApiModel, SessionApiModel } from './api';

enum AuthStatus {
  Initial,
  Anonymous,
  Authorized,
}

type SessionFactoryOptions = {
  authorizedRequestFailed: Event<ApiError>;
  $$sessionApiModel: SessionApiModel;
  $$tokenStorageModel: TokenStorageModel;
};

// TODO: signOut при 401
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

  const sessionStarted = merge([checkAuthFx.doneData, signInFx.doneData]);
  const sessionEnded = merge([checkAuthFx.fail, signOutFx.done]);

  const $authStatus = createStore(AuthStatus.Initial)
    .on(sessionStarted, () => AuthStatus.Authorized)
    .on(sessionEnded, () => AuthStatus.Anonymous)
    .on(syncedWithToken, (_, syncedStatus) => syncedStatus);

  sample({
    clock: options.$$tokenStorageModel.initializeCompleted,
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
    clock: sessionStarted,
    fn: ({ accessToken }) => accessToken,
    target: options.$$tokenStorageModel.saveToken,
  });

  sample({ clock: sessionEnded, target: options.$$tokenStorageModel.deleteToken });

  const receivedUnauthorized = sample({
    clock: options.authorizedRequestFailed,
    filter: isUnauthorizedError,
  });

  sample({ clock: receivedUnauthorized, target: options.$$tokenStorageModel.deleteToken });
  sample({ clock: receivedUnauthorized, fn: () => AuthStatus.Anonymous, target: $authStatus });
  redirect({ clock: receivedUnauthorized, route: routes.auth.signIn });

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
  authorizedRequestFailed: $$apiModel.authorizedRequestFailed,
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
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const receivedAnonymous = createEvent<RouteParamsAndQuery<Params>>();

  const initialSessionCheckStarted = combineEvents({
    events: [sessionCheckStarted, $$sessionModel.syncedWithToken],
  });

  const alreadyAuthorized = sample({
    clock: sessionCheckStarted,
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Authorized,
  });

  const alreadyAnonymous = sample({
    clock: [sessionCheckStarted, initialSessionCheckStarted],
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: initialSessionCheckStarted,
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

  sample({ clock: receivedAnonymous, target: otherwise as Event<void> });

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthorized, $$sessionModel.checkAuthFx.done],
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
    events: [sessionCheckStarted, $$sessionModel.syncedWithToken],
  });

  const alreadyAuthorized = sample({
    clock: sessionCheckStarted,
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Authorized,
  });

  const alreadyAnonymous = sample({
    clock: [sessionCheckStarted, initialSessionCheckStarted],
    source: $$sessionModel.$authStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: initialSessionCheckStarted,
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

  sample({ clock: receivedAuthorized, target: otherwise as Event<void> });

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, $$sessionModel.checkAuthFx.fail],
    cancelOn: receivedAuthorized,
  });
};
