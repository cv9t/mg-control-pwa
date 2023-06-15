import { Model, modelFactory } from 'effector-factorio';

import { $$apiModel, ApiModel } from '@mg-control/web/shared/api';

type DashboardPageApiFactoryOptions = {
  $$apiModel: ApiModel;
};

const dashboardPageApiFactory = modelFactory((options: DashboardPageApiFactoryOptions) => {
  const toggleLightFx = options.$$apiModel.createAuthorizedRequestFx<void, void>({
    url: 'device/toggle-light',
    method: 'POST',
  });

  return { toggleLightFx };
});

export type DashboardPageApiModel = Model<typeof dashboardPageApiFactory>;

export const $$dashboardPageApiModel = dashboardPageApiFactory.createModel({ $$apiModel });
