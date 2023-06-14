import { MouseEvent } from 'react';

import { attach, createEvent } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { RequestConfig } from '@mg-control/web/shared/api';

import { $$dashboardPageApiModel, DashboardPageApiModel } from './api';

type DashboardPageFactoryOptions = {
  $$dashboardPageApiModel: DashboardPageApiModel;
};

const dashboardPageFactory = modelFactory((options: DashboardPageFactoryOptions) => {
  const controlLightClicked = createEvent<MouseEvent>();

  const controlLightFx = attach({
    effect: options.$$dashboardPageApiModel.controlLightFx,
    mapParams: (state: 'on' | 'off'): RequestConfig<void> => ({
      params: { state },
      errorNotificationOptions: {
        title: 'Light control Error!',
        message: 'Control light failed.',
      },
    }),
  });

  const $isControlLightPending = controlLightFx.pending;

  return { controlLightClicked, $isControlLightPending };
});

export type DashboardPageModel = Model<typeof dashboardPageFactory>;

export const $$dashboardPageModel = dashboardPageFactory.createModel({ $$dashboardPageApiModel });
