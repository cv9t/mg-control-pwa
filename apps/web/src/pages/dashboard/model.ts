import { MouseEvent } from 'react';

import { attach, createEvent, createStore, merge, sample } from 'effector';

import { chainRoute, RouteParamsAndQuery } from 'atomic-router';
import { combineEvents } from 'patronum';

import { deviceModel } from '@mg-control/web/entities/device';
import { chainAuthorized } from '@mg-control/web/entities/session/model';
import { routes } from '@mg-control/web/shared/routing';

import * as api from './api';

export const unmounted = createEvent();

export const toggleLightClicked = createEvent<MouseEvent>();

const deviceConnectionCompleted = merge([
  deviceModel.connectionFailed,
  combineEvents({
    events: [deviceModel.connectionEstablished, deviceModel.dataReceived],
  }),
]);

const toggleLightFx = attach({ effect: api.toggleLightFx });

const $prevIsLightOn = createStore(false);

const isLightOnChanged = sample({
  clock: deviceModel.dataReceived,
  source: { deviceData: deviceModel.$data, prevIsLightOn: $prevIsLightOn },
  filter: ({ deviceData, prevIsLightOn }) => !!deviceData?.isLightOn !== prevIsLightOn,
});

export const $isLightOnPending = createStore(false)
  .on(toggleLightFx, () => true)
  .reset(isLightOnChanged);

export const $isDeviceConnectionFailed = createStore(false)
  .on(deviceModel.connectionFailed, () => true)
  .reset(deviceModel.setupConnection);

export const $isLightOn = deviceModel.$data.map((data) => !!data?.isLightOn);
export const $airData = deviceModel.$data.map((data) => data?.air);
export const $soilData = deviceModel.$data.map((data) => data?.soil);

sample({ clock: unmounted, target: deviceModel.closeConnection });

sample({
  clock: toggleLightClicked,
  source: deviceModel.$data,
  fn: (data) => (data?.isLightOn ? 'off' : 'on'),
  target: toggleLightFx,
});

sample({
  clock: toggleLightFx,
  source: deviceModel.$data,
  fn: (data) => !!data?.isLightOn,
  target: $prevIsLightOn,
});

const deviceConnectStarted = createEvent<RouteParamsAndQuery<{}>>();

sample({ clock: deviceConnectStarted, target: deviceModel.setupConnection });

export const currentRoute = routes.dashboard;
export const authorizedRoute = chainAuthorized(routes.dashboard);
export const deviceConnectedRoute = chainRoute({
  route: authorizedRoute,
  beforeOpen: deviceConnectStarted,
  openOn: deviceConnectionCompleted,
});
