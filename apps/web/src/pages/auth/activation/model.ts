import { attach, createEvent, createStore } from 'effector';

import { sessionModel } from '@mg-control/web/entities/session';
import { Activation } from '@mg-control/web/features/auth/activation';
import { routes } from '@mg-control/web/shared/routing';

export const mounted = createEvent();

const activateFx = attach({ effect: sessionModel.activateFx });

export const activationFormModel = Activation.createFormModel({
  activateFx,
});

export const $isActivationCompleted = createStore(false)
  .on(activateFx.done, () => true)
  .reset(mounted);

export const currentRoute = routes.auth.activation;
export const anonymousRoute = sessionModel.chainAnonymous(currentRoute);
