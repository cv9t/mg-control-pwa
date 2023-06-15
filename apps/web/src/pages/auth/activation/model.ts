import { attach, createEvent, createStore } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { $$sessionModel, chainAnonymous, SessionModel } from '@mg-control/web/entities/session';
import { activationFormFactory } from '@mg-control/web/features/auth/activation';
import { routes } from '@mg-control/web/shared/routing';

type ActivationPageFactoryOptions = {
  $$sessionModel: SessionModel;
};

const activationPageFactory = modelFactory((options: ActivationPageFactoryOptions) => {
  const mounted = createEvent();

  const activateFx = attach({ effect: options.$$sessionModel.activateFx });

  const $$activationFormModel = activationFormFactory.createModel({
    activateFx,
  });

  const $isActivationCompleted = createStore(false)
    .on(activateFx.done, () => true)
    .reset(mounted);

  return {
    mounted,
    $$activationFormModel,
    $isActivationCompleted,
  };
});

export type ActivationPageModel = Model<typeof activationPageFactory>;

export const $$activationPageModel = activationPageFactory.createModel({ $$sessionModel });

export const activationRoute = routes.auth.activation;
export const anonymousActivationRoute = chainAnonymous(activationRoute);
