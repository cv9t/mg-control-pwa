/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MouseEvent } from 'react';

import { attach, createEvent, createStore, merge, sample } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { chainRoute } from 'atomic-router';
import { combineEvents } from 'patronum';

import { $$deviceModel, DeviceModel } from '@mg-control/web/entities/device/model';
import { chainAuthorized } from '@mg-control/web/entities/session';
import { RequestConfig } from '@mg-control/web/shared/api';
import { routes } from '@mg-control/web/shared/routing';

import { $$dashboardPageApiModel, DashboardPageApiModel } from './api';

type DashboardPageFactoryOptions = {
  $$deviceModel: DeviceModel;
  $$dashboardPageApiModel: DashboardPageApiModel;
};

const dashboardPageFactory = modelFactory((options: DashboardPageFactoryOptions) => {
  const unmounted = createEvent();

  const setupDeviceStarted = createEvent();

  const toggleLightClicked = createEvent<MouseEvent>();

  const setupDeviceCompleted = merge([
    options.$$deviceModel.connectionFailed,
    combineEvents({
      events: [options.$$deviceModel.connectionEstablished, options.$$deviceModel.dataReceived],
    }),
  ]);

  const toggleLightFx = attach({
    effect: options.$$dashboardPageApiModel.toggleLightFx,
    mapParams: (state: 'on' | 'off'): RequestConfig<void> => ({
      params: { state },
      errorNotificationOptions: {
        title: 'Toggle light Error!',
        message: 'Toggle light failed.',
      },
    }),
  });

  const lightStateLoaded = combineEvents({
    events: [toggleLightFx.finally, options.$$deviceModel.dataReceived],
  });

  const $isDeviceConnectionFailed = createStore(false)
    .on(options.$$deviceModel.setupConnection, () => false)
    .on(options.$$deviceModel.connectionFailed, () => true);

  const $isLightStateLoading = createStore(false)
    .on(toggleLightFx, () => true)
    .on(lightStateLoaded, () => false);

  sample({ clock: setupDeviceStarted, target: options.$$deviceModel.setupConnection });
  sample({ clock: unmounted, target: options.$$deviceModel.closeConnection });
  sample({
    source: options.$$deviceModel.$data,
    clock: toggleLightClicked,
    fn: (data) => (data?.isLightOn ? 'off' : 'on'),
    target: toggleLightFx,
  });

  return {
    unmounted,
    setupDeviceStarted,
    setupDeviceCompleted,
    toggleLightClicked,
    $isDeviceConnectionFailed,
    $deviceData: options.$$deviceModel.$data,
    $isLightStateLoading,
  };
});

export type DashboardPageModel = Model<typeof dashboardPageFactory>;

export const $$dashboardPageModel = dashboardPageFactory.createModel({
  $$deviceModel,
  $$dashboardPageApiModel,
});

export const dashboardRoute = routes.dashboard;
export const authorizedDashboardRoute = chainAuthorized(dashboardRoute);
export const deviceConnectedRoute = chainRoute({
  route: authorizedDashboardRoute,
  // @ts-ignore
  beforeOpen: $$dashboardPageModel.setupDeviceStarted,
  openOn: $$dashboardPageModel.setupDeviceCompleted,
});
